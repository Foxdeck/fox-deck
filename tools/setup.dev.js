const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");

const execPromise = util.promisify(exec);

function copyEnvFiles() {
  const environmentFiles = [
    {
      src: __dirname + "/../apps/fox-deck-api/.env.example",
      target: __dirname + "/../apps/fox-deck-api/.env"
    }
  ];

  try {
    environmentFiles.forEach((file) => {
      fs.copyFileSync(file.src, file.target, fs.constants.COPYFILE_FICLONE);
      console.log(`${file.src} was copied to ${file.target}`);
    });
  } catch (e) {
    console.log(e);
  }
}

(async () => {
  console.log("Setup your developer environment...");

  console.log("Install dependencies...");
  await execPromise("npm i");
  await execPromise("npm run install:deps");

  console.log("Migrate your database...");
  await execPromise("cd ./apps/fox-deck-api && npm run prisma:migrate");

  copyEnvFiles();
  console.log("Setup finished. Happy coding!");
  console.log("You can start the application by running 'npm run dev'.");
})();


