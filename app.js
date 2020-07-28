const fs = require("fs");
const glob = require("glob");
const process = require("process");
const { exec } = require("child_process");
const path = require("path");

const gitSrcCmd = "git config --get remote.origin.url";
const currPath = process.cwd();
const gitRemotesTxt = path.join(currPath, "git_remotes.txt");
const wstream = fs.createWriteStream(gitRemotesTxt);

glob("../*/.git", function (er, dirs) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  if (er) console.log(er);

  //console.log(dirs);
  dirs.map((dir) => {
    const parentDir = dir + "/../";

    process.chdir(parentDir);
    //console.log(process.cwd());

    exec(gitSrcCmd, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      wstream.write(stdout);
    });
  });
});
