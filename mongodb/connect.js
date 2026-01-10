import { mongoose } from "mongoose";

const connectDb = async (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("mongodb is running"))
    .catch((error) => console.log(error));
};

export default connectDb;
