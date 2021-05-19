var express = require("express");
var router = express.Router();
const storage = require("node-persist");
const jwt = require("jsonwebtoken");

exports.checkToken = async (req, res, next) => {
  try {

    await storage.init();
    console.log(await storage.getItem("secret"));
    const token = req.headers.authorization;
    let decoded;
    if (!token) throw { code: 401, message: "UNAUTHORIZED" };
    console.log(token.replace("Bearer ", ""));

    try {
      decoded = jwt.verify(
        token.replace("Bearer ", ""),
        await storage.getItem("secret")
      );
    } catch (err) {
      console.log(err);
      throw { code: 401, message: "UNAUTHORIZED" };
    }

    if (decoded.key !== (await storage.getItem("key")))
      throw { code: 401, message: "UNAUTHORIZED" };
    console.log(decoded);
    req.decoded = decoded;
    next();
    
  } catch (error) {
    console.log(error);
    if (!!error.code) res.status(error.code).send(error.message);
    else res.status(422).send(error);
  }
};
