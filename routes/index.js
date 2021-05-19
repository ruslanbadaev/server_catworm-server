var express = require("express");
var router = express.Router();
var exec = require("child_process").exec;

/* GET home page. */
router.post("/script", function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  console.log(req.params);
  exec(req.body.script, function (error, stdout, stderr) {
    console.log(error);

    if (stderr) res.send({ title: stderr });
    else res.send({ title: stdout });
  });
});

module.exports = router;
