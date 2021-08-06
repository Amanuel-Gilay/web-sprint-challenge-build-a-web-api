const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file
const projectsRouter = require('./users/users-router')

server.use(express.json());
server.use('/api/actions', actiosRouter);

server.use('/api/projects', projectsRouter);


server.get('/', ( req, res, ) =>{
  res.send(<h2>Let's write some middleware!</h2>)
})

module.exports = server;
