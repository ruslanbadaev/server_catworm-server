var express = require("express");
var router = express.Router();

exports.checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw { code: 401, message: "UNAUTHORIZED" };
    const decoded = jwt.verify(token.replace("Bearer ", ""), "wrong-secret");
    console.log(decoded);
    req.decoded = decoded;
    next();
  } catch (error) {
    if (!!error.code) res.status(error.code).send(error.message);
    else res.status(422).send(error);
  }
};
