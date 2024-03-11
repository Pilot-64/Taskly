import { join } from "node:path";
import { BrowserWindow, IpcMainEvent, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import { existsSync, mkdirSync } from "node:fs";
import { saveTasks } from "./ipcHandler";

//* Useful variables
const height = 600;
const width = 800;

//* Create window
function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
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
  ipcMain.on("save-tasks", (event: IpcMainEvent, tasks: Tasks[]) =>
    saveTasks(event, tasks)
  );
}

//* Setup directories for storing app data
const dataPath = app.getPath("userData");
const userDataPath = join(dataPath, "data");
const sessionDataPath = join(dataPath, "session");
const logPath = join(dataPath, "logs");
const crashDumpPath = join(dataPath, "crash-reports");

if (!existsSync(dataPath)) mkdirSync(dataPath);
if (!existsSync(userDataPath)) mkdirSync(userDataPath);
if (!existsSync(sessionDataPath)) mkdirSync(sessionDataPath);
if (!existsSync(logPath)) mkdirSync(logPath);
if (!existsSync(crashDumpPath)) mkdirSync(crashDumpPath);

app.setPath("userData", userDataPath);
app.setPath("sessionData", sessionDataPath);
app.setPath("logs", logPath);
app.setPath("crashDumps", crashDumpPath);

//* Register common app events
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (
      process.platform == "darwin" &&
      BrowserWindow.getAllWindows().length == 0
    )
      createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") app.quit();
});
