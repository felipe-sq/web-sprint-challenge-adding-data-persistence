// build your `Task` model here
const db = require('../../data/dbConfig.js');
const { getProjectById } = require('../project/model.js');

async function getTasks() {
  return await db('tasks');
}

async function getTaskById(task_id) {
  return await db('tasks').where('task_id', task_id).first();
}

async function createTask(project_id, task) {
  return await db('tasks')
  .insert(task)
  .then(ids => {
    return getProjectById(project_id);
  })
}

module.exports = {
  getTasks,
  getTaskById,
  createTask
};