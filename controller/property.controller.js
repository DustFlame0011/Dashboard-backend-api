import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PropertyModel from "../model/property.js";
import UserModel from "../model/user.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query = {};

  if (title_like !== "") {
    query.title = { $regex: title_like, $options: "i" };
  }

  if (propertyType !== "") {
    query.propertyType = propertyType;
  }

  try {
    const count = await PropertyModel.countDocuments({ query });
    const properties = await PropertyModel.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order === "asc" ? 1 : -1 });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetail = async (req, res) => {
  const { id } = req.params;

  const propertyExits = await PropertyModel.findOne({ _id: id }).populate(
    "creator"
  );
  if (propertyExits) {
    res.status(200).json(propertyExits);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
};

const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await UserModel.findOne({ email }).session(session);
    if (!user) throw new Error("User not found");
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = new PropertyModel({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });
    user.allProperties.push(newProperty._id);
    await newProperty.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, propertyType, location, price, photo } =
      req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    await PropertyModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        propertyType,
        location,
        price,
        photo: photoUrl.url || photo,
      }
    );
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyExits = await PropertyModel.findById({ _id: id }).populate(
      "creator"
    );
    if (!propertyExits) throw new Error("Property not found");
    const session = await mongoose.startSession();
    session.startTransaction();

    await PropertyModel.deleteOne({ _id: id }, { session });
    propertyExits.creator.allProperties.pull(propertyExits);
    await propertyExits.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
