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
  const cpuMaxPerc = 50;
  const driveMaxPerc = 50;
  const memoryMaxPerc = 50;
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
      const result = {
        cpu: { usage: cpuUsage, total: 100 },
        drive: { usage: driveUsage.usedGb, total: driveUsage.totalGb },
        memory: { usage: memUsage.usedMemMb, total: memUsage.totalMemMb },
      };
      console.log((driveUsage.usedGb / driveUsage.totalGb) * 100);
      console.log((memUsage.usedMemMb / memUsage.totalMemMb) * 100);
      if (
        cpuUsage > cpuMaxPerc ||
        (Number(driveUsage.usedGb) / Number(driveUsage.totalGb)) * 100 >
          driveMaxPerc ||
        (Number(memUsage.usedMemMb) / Number(memUsage.totalGb)) * 100 >
          memoryMaxPerc
      ) {
        console.log("aaaaaaaaaaa");
      }
    }, 2000);
  } catch (error) {
    console.error(error);
  }
})();
