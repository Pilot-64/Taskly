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

// Declare an API for the front end to use
const api = {
  SaveTasks: (tasks: Tasks[]) => {
    ipcRenderer.send("save-tasks", tasks);
  },
  LoadTasks: () => ipcRenderer.invoke("load-tasks") as Promise<Tasks[] | null>
};

contextBridge.exposeInMainWorld("Main", api);
