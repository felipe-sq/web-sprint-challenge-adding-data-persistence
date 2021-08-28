// build your `/api/tasks` router here
const router = require('express').Router();
const taskHelpers = require('./model.js');

const {
  checkProjectId,
  validateTask
} = require('./task-middleware.js');

router.get('/', (req, res, next) => {
  taskHelpers.getTasks()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(next);
});

router.get('/:task_id', (req, res, next) => {
  taskHelpers.getTaskById(req.params.task_id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(next);
});

router.post('/:project_id', checkProjectId, validateTask, (req, res, next) => {
  taskHelpers.createTask(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(next);
});

module.exports = router;