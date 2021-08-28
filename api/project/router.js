// build your `/api/projects` router here
const router = require("express").Router();
const projectHelpers = require('./model.js');

// const boolean = (boolData) => {
//   return boolData.map((data) => ({
//     ...data,
//     project_completed: data.project_completed === 1 ? true : false,
//   }));
// };

router.get('/', async (req, res, next) => {
  
  try {
    const projects = await projectHelpers.getAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/:project_id', (req, res, next) => {
  projectHelpers.getProjectById(req.params.project_id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.post('/', async (req, res, next) => {

  try {
    const newProject = await projectHelpers.createProject(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

module.exports = router;