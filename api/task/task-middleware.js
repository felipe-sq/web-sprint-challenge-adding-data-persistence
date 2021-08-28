const Task = require('./model.js');
const Project = require('../project/model.js');

const checkProjectId = async (req, res, next) => {  
  try {
    const project = await Project.getProjectById(req.params.project_id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: `Project with project_id ${project} not found` });
    }
  } catch (error) {
    next(error);
  }
}

const validateTask = (req, res, next) => {
  try {
    if (!req.body.task_description || typeof req.body.task_description !== 'string' || req.body.task_description.trim() === '') {
      res.status(400).json({ message: 'Task description is required!' });
    } if (!req.body.project_id || typeof req.body.project_id !== 'number') {
      res.status(400).json({ message: `Project ID is required! ID of ${req.body.project_id} not found!` });
    }
    next();

  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkProjectId,
  validateTask
}