import UserModel from "../model/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).limit(req.query._end);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(200).json(userExists);
    }

    const newUser = new UserModel.create({ name, email, avatar });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ _id: id }).populate("allProperties");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, getUserInfoById };
