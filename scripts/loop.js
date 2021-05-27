const axios = require('axios');
const osu = require("node-os-utils");
const cpu = osu.cpu;
const drive = osu.drive;
const mem = osu.mem;

(async () => {
  // add constants (user settings)
  const cpuMaxPerc = 50;
  const driveMaxPerc = 50;
  const memoryMaxPerc = 50;
  const loopTimeout = 2;
  try {
    setInterval(async () => {
      // get curr server info 
      const cpuUsage = await cpu.usage();
      const driveUsage = await drive.used();
      const memUsage = await mem.used();
      // init result 
      const result = {
        cpu: { usage: cpuUsage, total: 100 },
        drive: { usage: driveUsage.usedGb, total: driveUsage.totalGb },
        memory: { usage: memUsage.usedMemMb, total: memUsage.totalMemMb },
      };
      console.log((driveUsage.usedGb / driveUsage.totalGb) * 100);
      console.log((memUsage.usedMemMb / memUsage.totalMemMb) * 100);
      // if bad info
      if (
        cpuUsage > cpuMaxPerc ||
        (Number(driveUsage.usedGb) / Number(driveUsage.totalGb)) * 100 >
          driveMaxPerc ||
        (Number(memUsage.usedMemMb) / Number(memUsage.totalGb)) * 100 >
          memoryMaxPerc
      ) {
        axios({
          method: 'post',
          url: '/notification',
          data: result
        });
      }
    }, loopTimeout*1000);
  } catch (error) {
    console.error(error);
  }
})();
