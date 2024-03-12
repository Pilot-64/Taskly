import { join } from "node:path";
import { BrowserWindow, IpcMainEvent, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import { existsSync, mkdirSync } from "node:fs";
import { loadTasks, saveTasks } from "./ipcHandler";
import { log } from "./logger";

//* Useful variables
const height = 475;
const width = 800;

//* Setup directories for storing app data
const dataPath = isDev ? __dirname : app.getPath("userData");
const userDataPath = join(dataPath, "data");
const sessionDataPath = join(dataPath, "session");
const logPath = join(dataPath, "logs");
const crashDumpPath = join(dataPath, "crash-dumps");

if (!existsSync(dataPath)) mkdirSync(dataPath);
if (!existsSync(userDataPath)) mkdirSync(userDataPath);
if (!existsSync(sessionDataPath)) mkdirSync(sessionDataPath);
if (!existsSync(logPath)) mkdirSync(logPath);
if (!existsSync(crashDumpPath)) mkdirSync(crashDumpPath);

app.setPath("userData", userDataPath);
app.setPath("sessionData", sessionDataPath);
app.setPath("logs", logPath);
app.setPath("crashDumps", crashDumpPath);
log.debug("Remapped directories from default to desired ones.");

//* Create window
function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width: isDev ? width + 400 : width,
    height,
    minWidth: width,
    minHeight: height,
    frame: true,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, "preload.js")
    }
  });
  window.removeMenu();

  const port = process.env.PORT || 3000;
  const url = isDev
    ? `http://localhost:${port}`
    : join(__dirname, "../src/out/index.html");

  // Load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
    window.webContents.openDevTools();
  } else {
    window?.loadFile(url);
  }

  // Register ipcMain API events to function
  ipcMain.on("save-tasks", (_event: IpcMainEvent, tasks: Tasks[]) =>
    saveTasks(tasks)
  );
  ipcMain.on(
    "log-debug",
    (_event: IpcMainEvent, message: string, object?: unknown) =>
      log.debug(message, object)
  );
  ipcMain.on("log-info", (_event: IpcMainEvent, message: string) =>
    log.info(message)
  );
  ipcMain.on(
    "log-warn",
    (_event: IpcMainEvent, message: string, error?: Error) =>
      log.warn(message, error)
  );
  ipcMain.on(
    "log-error",
    (_event: IpcMainEvent, error: Error, message: string) =>
      log.error(error, message)
  );
  ipcMain.on(
    "log-fatal",
    (_event: IpcMainEvent, error: Error, message: string) =>
      log.fatal(error, message)
  );
}

//* Register common app events
app.whenReady().then(() => {
  //* Handle 2 way ipc
  ipcMain.handle("load-tasks", loadTasks);

  //* Create window
  createWindow();
  log.info("New window created!");

  app.on("activate", () => {
    if (
      process.platform == "darwin" &&
      BrowserWindow.getAllWindows().length == 0
    ) {
      createWindow();
      log.info("New window created!");
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    log.info("No windows detecting, quitting application.");
    app.quit();
  } else {
    log.info("No windows detected, waiting for user to create new window.");
  }
});

app.on("before-quit", () => {
  log.info("Application shutting down.");
  log.shutdown();
});
