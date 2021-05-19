var express = require("express");
var router = express.Router();

exports.checkToken = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.send(error);
  }
};
