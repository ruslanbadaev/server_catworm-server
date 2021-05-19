const publicIp = require("public-ip");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode-terminal");
const { prompt } = require("enquirer");
const storage = require("node-persist");
const figlet = require("figlet");
const crypto = require("crypto");

(async () => {
  await storage.init();
  const secret = await prompt({
    type: "input",
    name: "secret",
    message: "What is your secret word?",
  });
const randKey = crypto.randomBytes(20).toString('hex');
  const tokenData = {
    ip: await publicIp.v4(),
    key: randKey
  };
  console.log(
    figlet.textSync("   Scan it \n with your \nmobile app", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  const token = jwt.sign(tokenData, secret.secret);

  await storage.setItem('key', randKey)
  await storage.setItem('secret', secret.secret)
  qrcode.generate(token, { small: true }, function (qrcode) {
    console.log(qrcode);
  });
})();
