const router = require("express").Router();
const passport = require("passport");
const Admin = require("../models/admin.model");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  console.log(req.file);
  try {
    // const user = new User (req.body);
    const admin = new Admin(req.body);
    await admin.save();
    res.redirect("/auth/register");
  } catch (e) {
    console.log(e);
  }
});

router.get("/login", (req, res) => {
  req.flash('success', 'Flash is back!')
  res.render("auth/login");
});

/**
 * Handles the login
 */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/auth/login",
    successFlash: "Successfully logged in"
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
