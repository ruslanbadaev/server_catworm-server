const publicIp = require("public-ip");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode-terminal");
const { prompt } = require("enquirer");
const figlet = require('figlet');

(async () => {
  const secret = await prompt({
    type: "input",
    name: "secret",
    message: "What is your secret word?",
  });

  const tokenData = {
    ip: await publicIp.v4(),
  };
  console.log(figlet.textSync('   Scan it \n with your \nmobile app', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}));
  const token = jwt.sign(tokenData, secret.secret);
  qrcode.generate(token, { small: true }, function (qrcode) {
    console.log(qrcode);
  });
})();
