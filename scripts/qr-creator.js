const publicIp = require("public-ip");

(async () => {
  const tokenData = {
    ip: await publicIp.v4(),
  };
  console.log(tokenData);
})();
