const publicIp = require("public-ip");
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode-terminal');

(async () => {
  const tokenData = {
    ip: await publicIp.v4(),
  };
  const token = jwt.sign(tokenData, 'heh');
  qrcode.generate(token, {small: true}, function (qrcode) {
    console.log(qrcode)
});
})();
