const { spawn } = require("child_process");

const children = [];
let shuttingDown = false;

function start(name, args) {
  const child = spawn("npm", args, { stdio: "inherit", shell: true });
  child.on("exit", (code, signal) => {
    if (!shuttingDown) {
      shuttingDown = true;
      stopAll();
      process.exit(code ?? (signal ? 1 : 0));
    }
  });
  children.push(child);
}

function stopAll() {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
}

start("backend", ["run", "dev", "--prefix", "backend"]);
start("frontend", ["run", "dev", "--prefix", "frontend"]);

process.on("SIGINT", () => {
  shuttingDown = true;
  stopAll();
  process.exit(0);
});

process.on("SIGTERM", () => {
  shuttingDown = true;
  stopAll();
  process.exit(0);
});
