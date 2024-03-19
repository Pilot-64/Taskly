import { app } from "electron";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "./index";

export function saveTasks(tasks: Tasks[]) {
  const file = join(app.getPath("userData"), "tasks.json");
  const data = tasks.filter((task) => !task.completed);
  try {
    writeFileSync(file, JSON.stringify(data));
    log.debug("Successfully saved tasks to file.");
  } catch (error) {
    log.error(error as Error, "Failed to save tasks to file.");
  }
}

export function loadTasks() {
  const file = join(app.getPath("userData"), "tasks.json");
  try {
    const data = readFileSync(file);
    log.debug("Read saved tasks from file.");
    return JSON.parse(data + "") as Tasks[];
  } catch (error) {
    log.warn(
      "Failed to read saved tasks from file, could be because no tasks where ever saved.",
      error as Error
    );
    return null;
  }
}
