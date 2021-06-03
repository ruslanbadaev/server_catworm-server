const exec = require("child_process").exec;

exports.runScript = async (req, res) => {
    try {
        // run bash script
        exec(req.body.script, function (error, stdout, err) {
            // send error
            if (err) res.status(422).send({ message: err });
            // send data
            else res.status(201).send({ message: stdout });
          });
    } catch (error) {
        res.status(422).send({ message: error });
    }
  }