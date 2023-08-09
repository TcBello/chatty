const express = require("express");
const {
  signUp,
  login,
  getUserByID,
  updatePreferences,
  getPreferences,
  updateAvatar,
  updateUsername,
} = require("../controllers/user_controller");

const router = express.Router();

router.route("/:id").get(getUserByID);
router.route("/sign-up").post(signUp);
router.route("/login").post(login);
router.route("/:id/preference").get(getPreferences);
router.route("/:id/preference").put(updatePreferences);
router.route("/:id/avatar").put(updateAvatar);
router.route("/:id/username").put(updateUsername);

module.exports.UserRoutes = router;
