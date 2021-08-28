// build your `/api/projects` router here
const router = require("express").Router();
const projectHelpers = require('./model.js');

router.get('/', (req, res, next) => {
  // console.log('API payload is pending')

  projectHelpers.getAll()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get('/:project_id', (req, res, next) => {
  projectHelpers.getProjectById(req.params.project_id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const newProject = req.body;

  if (!newProject.project_name) {
    return next({ status: 400, message: 'Missing required field: project name' });
  } else {
  projectHelpers.createProject(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
  }
});

module.exports = router;