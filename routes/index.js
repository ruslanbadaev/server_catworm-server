var express = require("express");
var router = express.Router();
var exec = require("child_process").exec;

router.post("/script", function (req, res, next) {
  exec(req.body.script, function (error, stdout, stderr) {
    console.log(error);
    if (stderr) res.send({ title: stderr });
    else res.send({ title: stdout });
  });
});

module.exports = router;
