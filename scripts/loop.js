const osu = require("node-os-utils");
const cpu = osu.cpu;
const drive = osu.drive;
const mem = osu.mem;

(async () => {
  const cpuMaxPerc = 50;
  const driveMaxPerc = 50;
  const memoryMaxPerc = 50;
  try {
    setInterval(async () => {
      const cpuUsage = await cpu.usage();
      const driveUsage = await drive.used();
      const memUsage = await mem.used();

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
      }
    }, 2000);
  } catch (error) {
    console.error(error);
  }
})();
