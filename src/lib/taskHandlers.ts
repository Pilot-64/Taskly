export function handleTaskDelete(
  tasks: Tasks[],
  setTasks: Function,
  deletedTask: Tasks
) {
  const newTasks = tasks.filter((item) =>
    item.id != deletedTask.id
  );
  setTasks(newTasks);
  window.Main.SaveTasks(newTasks);
}

export function handleTaskUpdate(
  tasks: Tasks[],
  setTasks: Function,
  updatedTask: Tasks
) {
  const newTasks = tasks.map((item) =>
    item.id == updatedTask.id ? updatedTask : item
  );
  setTasks(newTasks);
  window.Main.SaveTasks(newTasks);
}
