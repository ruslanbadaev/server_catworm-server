const publicIp = require("public-ip");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode-terminal");
const { prompt } = require("enquirer");
const storage = require("node-persist");
const figlet = require("figlet");
const crypto = require("crypto");

(async () => {
  await storage.init();

  // write clients question to console
  const secret = await prompt({
    type: "input",
    name: "secret",
    message: "What is your secret word?",
  });

  // generate random key
  const randKey = crypto.randomBytes(20).toString("hex");

  // init token
  const tokenData = {
    ip: await publicIp.v4(),
    key: randKey,
  };

  // ascii header for console
  console.log(
    figlet.textSync("   Scan it \n with your \nmobile app", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );

  // generate token
  const token = jwt.sign(tokenData, secret.secret);

  // write data to storage
  await storage.setItem("key", randKey);
  await storage.setItem("secret", secret.secret);

  // generate and show qr code
  qrcode.generate(token, { small: true }, function (qrcode) {
    console.log(qrcode);
  });
})();
