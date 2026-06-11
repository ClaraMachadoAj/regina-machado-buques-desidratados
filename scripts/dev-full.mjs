import { spawn } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  spawn(npm, ["run", "server"], { stdio: "inherit", shell: false }),
  spawn(npm, ["run", "dev"], { stdio: "inherit", shell: false })
];

function shutdown(signal) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

for (const child of processes) {
  child.on("exit", (code) => {
    if (code && code !== 0) {
      shutdown("SIGTERM");
      process.exitCode = code;
    }
  });
}
