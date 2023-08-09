const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_KEY)
    .then((value) => console.log("connected"))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;
