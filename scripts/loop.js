const publicIp = require("public-ip");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode-terminal");
const { prompt } = require("enquirer");
const storage = require("node-persist");
const figlet = require("figlet");
const crypto = require("crypto");
const exec = require("child_process").exec;
const os = require('os');

(async () => {
  try {
console.log("cpus: " + JSON.stringify( os.cpus()));
console.log("endianness: " + JSON.stringify( os.endianness()));
console.log("freemem: " + JSON.stringify( os.freemem()));
console.log("hostname: " + JSON.stringify( os.hostname()));
console.log("networkInterfaces: " + JSON.stringify( os.networkInterfaces()));
console.log("totalmem: " + JSON.stringify( os.totalmem()));
console.log("type: " + JSON.stringify( os.type()));
console.log("uptime: " + JSON.stringify( os.uptime())); 
console.log("userInfo: " + JSON.stringify( os.userInfo())); 

/*     setInterval(() => {
      // run bash script
      exec("node -v", function (error, stdout, err) {
        console.log(stdout);
      });
    }, 2000); */
  } catch (error) {
    console.error(error);
  }
})();
