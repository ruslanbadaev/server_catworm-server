const storage = require("node-persist");
const jwt = require("jsonwebtoken");

exports.checkToken = async (req, res, next) => {
  try {
    await storage.init();

    // get secret from storage
    console.log(await storage.getItem("secret"));

    // get tohen from requests header
    const token = req.headers.authorization;
    let decoded;

    // check token
    if (!token) throw { code: 401, message: "UNAUTHORIZED" };

    try {
      // decode token
      decoded = jwt.verify(
        token.replace("Bearer ", ""),
        await storage.getItem("secret")
      );
    } catch (err) {
      console.log(err);
      throw { code: 401, message: "UNAUTHORIZED" };
    }
    // check data from token
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
