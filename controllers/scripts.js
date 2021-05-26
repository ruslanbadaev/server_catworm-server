const exec = require("child_process").exec;

exports.runScript = async (req, res) => {
    try {
        // run bash script
        exec(req.body.script, function (error, stdout, err) {
            // send error
            if (err) res.send({ title: err });
            // send data
            else res.send({ title: stdout });
          });
    } catch (error) {
        res.send({ title: error });
    }
  }