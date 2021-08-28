// build your `/api/tasks` router here
const router = require('express').Router();
const taskHelpers = require('./model.js');

const { validateTask } = require('./task-middleware.js');

router.get('/', (req, res, next) => {
  taskHelpers.getTasks()
    .then(tasks => {
      res.status(200).json((tasks));
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

router.post('/', validateTask, async (req, res, next) => {
  try {
    const newTask = await taskHelpers.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

module.exports = router;