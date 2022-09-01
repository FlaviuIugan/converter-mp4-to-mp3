const fsPromises = require("fs").promises;
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const readDirectory = () => {
  const file = fsPromises.readdir("./mp4");
  return file;
};

const trimString = async () => {
  const allSongs = await readDirectory();

  allSongs.forEach(async (file) => {
    const newFileName = file.replace(/\s/g, "");

    fsPromises.rename(`./mp4/${file}`, `./mp4/${newFileName}`);
    // const { stdout, stderr } = await exec(`mv ${file} ${newFileName}`, {
    //   cwd: "./mp4",
    // });
    // console.log("stdout:", stdout);
    // console.error("stderr:", stderr);
  });
};
trimString();

const convertMp4ToMp3 = async () => {
  const allSongs = await readDirectory();
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
