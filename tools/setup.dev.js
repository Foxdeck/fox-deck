const fs = require("fs");
const { exec } = require("child_process");

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

(() => {
  console.log("Setup your developer environment...");

  console.log("Install dependencies...");
  exec("npm i");
  exec("npm run install:deps");

  console.log("Migrate your database...");
  exec("cd ./apps/fox-deck-api && npm run prisma:migrate");

  copyEnvFiles();
  console.log("Setup finished. Happy coding!");
  console.log("You can start the application by running 'npm run dev'.");
})();


