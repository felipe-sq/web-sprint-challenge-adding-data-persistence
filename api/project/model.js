// build your `Project` model here
const db = require("../../data/dbConfig.js");

async function getAll() {
  const projectArr =  await db("projects");

  return projectArr.map(project => {
    return {
      ...project,
      project_completed: project.project_completed === 1 ? true : false,
    };
  });
}

async function getProjectById(project_id) {
  return await db("projects").where('project_id', project_id).first();
}

async function createProject(project) {
  const [id] = await db("projects").insert(project, "project_id");
  const newProject = await getProjectById(id);

  return {
    ...newProject,
    project_completed: newProject.project_completed === 1 ? true : false,
  }
}

module.exports = {
  getAll,
  getProjectById,
  createProject
};