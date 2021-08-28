// build your `Project` model here
const db = require("../../data/dbConfig.js");

async function getAll() {
  return await db("projects");
}

async function getProjectById(project_id) {
  return await db("projects").where('project_id', project_id);
}

async function createProject(project) {
  return await db("projects").insert(project);
}

module.exports = {
  getAll,
  getProjectById,
  createProject
};