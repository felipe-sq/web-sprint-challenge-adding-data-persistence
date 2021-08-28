// build your `/api/resources` router here
const router = require('express').Router();
const resourceHelpers = require('./model.js');

router.get('/', (req, res, next) => {
  resourceHelpers.getResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(next) 
});

router.get('/:resource_id', (req, res, next) => {
  resourceHelpers.getResourceById(req.params.resource_id)
    .then(resource => {
      res.status(200).json(resource)
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const newResource = req.body;

  if (!newResource.resource_name) {
    return next({
      status: 400,
      message: 'Missing required field: resource name'
    });
  } else {
    resourceHelpers.createResource(newResource)
      .then(resource => {
        res.status(201).json(resource);
      })
      .catch(next);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

module.exports = router;