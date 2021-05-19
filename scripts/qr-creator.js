const publicIp = require("public-ip");
var jwt = require('jsonwebtoken');

(async () => {
  const tokenData = {
    ip: await publicIp.v4(),
  };
  const token = jwt.sign(tokenData, 'heh');
  console.log(tokenData);
  console.log(token);
})();
