// build your server here and require it from index.js
const express = require('express');
const server = express();

const projectsRouter = require('./project/router.js');
const resourcesRouter = require('./resource/router.js');
const tasksRouter = require('./task/router.js');

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);

// server.use('*', (req, res) => {
//   res.json({ api: "API is running!" });  
// });

server.use((err, req, res, next) => {
  res.status(500).json({ 
    message: err.message,
    stack: err.stack, 
  });
});

module.exports = server;