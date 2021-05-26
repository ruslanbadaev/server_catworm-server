const publicIp = require("public-ip");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode-terminal");
const { prompt } = require("enquirer");
const storage = require("node-persist");
const figlet = require("figlet");
const crypto = require("crypto");

(async () => {
  try {
    await storage.init();

    // get secret word from storage
    const secret = await storage.getItem("secret");

    // get random key from storage
    const randKey = await storage.getItem("key");

    // check for variables
    if (!secret || !randKey) throw 'Initialize qr code: "npm run gen"';

    // init new token
    const tokenData = {
      ip: await publicIp.v4(),
      key: randKey,
    };

    // console print ascii header
    console.log(
      figlet.textSync("   Scan it \n with your \nmobile app", {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );

    // generate new token
    const token = jwt.sign(tokenData, secret);
    qrcode.generate(token, { small: true }, function (qrcode) {
      console.log(qrcode);
    });
  } catch (error) {
    console.error(error);
  }
})();
