// build your `Task` model here
const db = require('../../data/dbConfig.js');

async function getTasks() {
  const allTasks = await db('tasks as t')
  .select('t.*', 'p.project_name', 'p.project_description')
  .join('projects as p', 't.project_id', 'p.project_id');

  return allTasks.map(task => {
    return {
      ...task,
      task_completed: task.task_completed === 1 ? true : false
    }
  })
}

async function getTaskById(task_id) {
  return await db('tasks as t')
  .select('t.*', 'p.project_name', 'p.project_description')
  .join('projects as p', 't.project_id', 'p.project_id')
  .where('t.task_id', task_id)
  .first();
}

async function createTask(task) {
  const [id] = await db('tasks').insert(task);
  const newTaskData = await getTaskById(id);

  return {
    ...newTaskData,
    task_completed: newTaskData.task_completed === 1 ? true : false,
  }

  // below code was one of the previous iterations -- needlessly complicated and did not work!

  // const project = await getProjectById(project_id);

  // if (!project) {
  //   return {
  //     error: 'Project does not exist'
  //   }
  // } else {
  //   const [id] = await db('tasks').insert(project_id, task);
  //   return await getTaskById(id);
  // }
  // return await db('tasks')
  // .insert(task)
  // .then(ids => {
  //   return getProjectById(project_id);
  // })
}

module.exports = {
  getTasks,
  getTaskById,
  createTask
};