const publicIp = require("public-ip");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode-terminal");
const { prompt } = require("enquirer");
const storage = require("node-persist");
const crypto = require("crypto");
const exec = require("child_process").exec;
const osu = require("node-os-utils");
const cpu = osu.cpu;
const osCmd = osu.osCmd;
const drive = osu.drive;
const mem = osu.mem;

(async () => {
  try {
    setInterval(async () => {
      const usage = await cpu.usage();
      const cpuUsage = await cpu.usage();
      const cpuFree = await cpu.free();
      const whoami = await osCmd.whoami();
      const driveUsage = await drive.used();
      const driveFree = await drive.free();
      const memUsage = await mem.used();
      const memFree = await mem.free();
      console.log("usage", usage);
      console.log("cpuUsage", cpuUsage);
      console.log("cpuFree", cpuFree);
      console.log("driveUsage", driveUsage);
      console.log("driveFree", driveFree);
      console.log("memUsage", memUsage);
      console.log("memFree", memFree);
      console.log("whoami", whoami);
      // run bash script
      exec("node -v", function (error, stdout, err) {
        console.log(stdout);
      });
    }, 2000);
  } catch (error) {
    console.error(error);
  }
})();
