const express = require("express");
const mongoose = require("mongoose");
const server = express();
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/passport.config");
const expressLayouts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const authController = require("./controllers/auth.controller");
const adminController = require("./controllers/admin.controller");
const applicantController = require("./controllers/applicant.controller");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Mongo connected"));

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(methodOverride("_method"));

server.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 360000 },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB, //Store session in mongodb to preview re-login on server reload
      }),
    })
  );
  //-- passport initialization
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(flash());
  server.use(express.static("uploads"))
  
  server.use(function (request, response, next) {
    // before every route, attach the flash messages and current user to res.locals
    response.locals.alerts = request.flash(); //{ success: [], error: []}
    response.locals.currentUser = request.user;
    next();
  });
  
  server.use("/admin", adminController);
  server.use("/auth", authController);
  server.use("/", applicantController);;
  
  server.get("*", (req, res) => {
    res.send("does not exist");
  });
  
  server.listen(process.env.PORT, () =>
    console.log(`connected to express on ${process.env.PORT}`)
  );
  