import mongoose from "mongoose";

const connectMongo = async () => {
  console.log("connectMongo");
  await mongoose.connect(process.env.MONGODB_URI);
  // mongoose.connection.on("connected", () => console.log("Connected"));
  // mongoose.connection.on("error", (err) =>
  //   console.log("Connection failed with - ", err)
  // );
  console.log("connected");
};

export default connectMongo;
