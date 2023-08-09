const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    id: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    birthday: String,
    gender: String,
    country: String,
    image: String,
    chattingState: String,
    preferences: {
      gender: String,
      country: String,
      interests: [],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
