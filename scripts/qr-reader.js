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
    const secret = await storage.getItem("secret");
    const randKey = crypto.randomBytes(20).toString("hex");
    if (!secret || !randKey) throw 'Initialize qr code: "npm run gen"';
    const tokenData = {
      ip: await publicIp.v4(),
      key: await storage.getItem("key"),
    };
    console.log(
      figlet.textSync("   Scan it \n with your \nmobile app", {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );
    const token = jwt.sign(tokenData, secret);
    qrcode.generate(token, { small: true }, function (qrcode) {
      console.log(qrcode);
    });
  } catch (error) {
    console.error(error);
  }
})();
