import { ipcRenderer, contextBridge } from "electron";

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }

  interface Tasks {
    id: string;
    title: string;
    completed: boolean;
  }
}

//* Declare an API for the front end to use
const api = {
  // Task savings
  SaveTasks: (tasks: Tasks[]) => {
    ipcRenderer.send("save-tasks", tasks);
  },
  LoadTasks: () => ipcRenderer.invoke("load-tasks") as Promise<Tasks[] | null>,

  // Logger
  /**
   * Log something for debug purpose, like the state
   * of a variable.
   *
   * **Debug is only availible in development environment.**
   * @param message A log message.
   * @param object The variable that needs to be logged.
   */
  LogDebug: (message:string, object?:unknown) => ipcRenderer.send("log-debug", message, object),

  /**
   * Log something.
   * @param message The message that will be logged.
   */
  LogInfo: (message:string) => ipcRenderer.send("log-info", message),

  /**
   * Log a warning.
   * @param message A warning message.
   * @param error An error that got thrown with the warning.
   */
  LogWarn: ( message:string, error?:Error) => ipcRenderer.send("log-warn", message, error),

  /**
   * Log an error. This error shouldn't cause the program to exit.
   * @param error The error getting logged.
   * @param message A nice message to go along with it.
   */
  LogError: (error:Error, message:string) => ipcRenderer.send("log-error", error, message),

  /**
   * Log a fatal error, these errors should cause the program to crash
   * and this should be the final log message.
   * This will automatically shutdown the logger and program as well.
   * @param error The error getting logged.
   * @param message A nice message to go along with it.
   */
  LogFatal: (error:Error, message:string) => ipcRenderer.send("log-fatal", error, message)
};

contextBridge.exposeInMainWorld("Main", api);
