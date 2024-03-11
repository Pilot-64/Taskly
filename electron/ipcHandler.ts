import { app } from "electron";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export function saveTasks(tasks: Tasks[]) {
  const file = join(app.getPath("userData"), "tasks.json");
  try {
    writeFileSync(file, JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
}

export function loadTasks() {
  const file = join(app.getPath("userData"), "tasks.json");
  try {
    const data = readFileSync(file);
    return JSON.parse(data + "") as Tasks[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
