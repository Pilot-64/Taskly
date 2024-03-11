// Native
import { join } from "path";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";

const height = 600;
const width = 800;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    minWidth: 700,
    minHeight: 500,
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

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  window.webContents.openDevTools();

  // For AppBar
  ipcMain.on("minimize", () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on("maximize", () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on("close", () => {
    window.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
