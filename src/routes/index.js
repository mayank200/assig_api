const { authJwt } = require("../middleware/index.js");
const UserCotroller = require("../controllers/userController");


const express = require("express");
// const authroute = express.Router();
// authroute.use(authJwt.verifyToken);


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Origin: *"
    );
    next();
  });

  app.post("/api/login", UserCotroller.login);
  app.post("/api/crud_operation", UserCotroller.crud_operation);




  

}