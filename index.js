const fs = require("fs");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const readDir = util.promisify(fs.readdir);

const convertMp4ToMp3 = async () => {
  const allSongs = await readDir("./mp4");

  allSongs.forEach((file) => {
    const newFileName = file.replace(/\s/g, "");
    fs.renameSync(`./mp4/${file}`, `./mp4/${newFileName}`);
  });

  allSongs.forEach(async (file) => {
    let outputName = file.slice(0, -1) + "3";
    const { stdout, stderr } = await exec(
      `ffmpeg -i ${file} ../mp3/${outputName}`,
      {
        cwd: "./mp4",
      }
    );
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
  });
};

convertMp4ToMp3();
