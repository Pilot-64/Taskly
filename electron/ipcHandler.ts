import { app } from "electron";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "./logger";

export function saveTasks(tasks: Tasks[]) {
  const file = join(app.getPath("userData"), "tasks.json");
  try {
    writeFileSync(file, JSON.stringify(tasks));
    log.info("Successfully saved tasks to file.");
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
    log.error(error as Error, "Failed to read saved tasks from file.");
    return null;
  }
}
