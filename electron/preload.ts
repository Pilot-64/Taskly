import { ipcRenderer, contextBridge } from "electron";

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  sendMessage: (message: string) => {
    ipcRenderer.send("message", message);
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    ipcRenderer.send("minimize");
  },
  Maximize: () => {
    ipcRenderer.send("maximize");
  },
  Close: () => {
    ipcRenderer.send("close");
  }
};
contextBridge.exposeInMainWorld("Main", api);
