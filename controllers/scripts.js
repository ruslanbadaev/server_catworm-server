var express = require("express");
var router = express.Router();
var exec = require("child_process").exec;

exports.runScript = async (req, res) => {
    try {
        exec(req.body.script, function (error, stdout, stderr) {
            console.log(error);
            if (stderr) res.send({ title: stderr });
            else res.send({ title: stdout });
          });
    } catch (error) {
        res.send({ title: error });
    }
  }