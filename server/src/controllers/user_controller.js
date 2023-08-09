const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user_model");

const signUp = asyncHandler(async (req, res) => {
  const userModel = new UserModel(req.body);
  const doc = await userModel.save();

  if (doc) {
    res.status(201).json({
      message: "Account created",
    });
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await UserModel.findOne({ id: id });
  if (user) {
    res.status(200).json({ message: "Login sucessfully" });
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

const getUserByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findOne({ id: id });
  if (user) {
    res.status(200).json({ message: "User obtained", data: user });
  } else {
    res.status(404).json({ message: "User does not exist", data: {} });
  }
});

const updatePreferences = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { gender, country, interests } = req.body;

  const currentUserModel = await UserModel.findOneAndUpdate(
    { id: id },
    {
      preferences: {
        gender: gender,
        country: country,
        interests: interests,
      },
    }
  );

  if (currentUserModel) {
    res.status(200).json({ message: "Preference updated" });
  } else {
    res.status(400).json({ message: "Malformed data" });
  }
});

const getPreferences = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const currentUser = await UserModel.findOne({ id: id });

  if (currentUser) {
    res
      .status(200)
      .json({ message: "Preference obtained", data: currentUser.preferences });
  } else {
    res.status(404).json({ message: "Preference can't be found", data: {} });
  }
});

const updateAvatar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { avatar } = req.body;

  const currentUser = await UserModel.findOneAndUpdate(
    { id: id },
    { image: avatar }
  );

  if (currentUser) {
    res.status(200).json({ message: "Avatar updated", data: currentUser });
  } else {
    res.status(404).json({ message: "Failed update", data: {} });
  }
});

const updateUsername = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const currentUser = await UserModel.findOneAndUpdate(
    { id: id },
    { username: username }
  );

  if (currentUser) {
    res.status(200).json({ message: "Username updated", data: currentUser });
  } else {
    res.status(404).json({ message: "Failed update", data: {} });
  }
});

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getUserByID = getUserByID;
module.exports.updatePreferences = updatePreferences;
module.exports.getPreferences = getPreferences;
module.exports.updateAvatar = updateAvatar;
module.exports.updateUsername = updateUsername;
