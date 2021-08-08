const express = require('express');
const Projects = require('./projects-model');
const { validateProjectsId,validatePoject } = require('./projects-middleware')
const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})


router.get('/:id', validateProjectsId, (req, res) => {
    res.json(req.Projects)
})


router.post('/', validatePoject, (req, res, next) => {
    Projects.insert(req.body)
    .then(post => {
        res.json(post)
    })
    .catch(next)
})


router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const body = req.body;
    if (!body.name || !body.description) {
        res.status(400).json({message: 'fields required'})
    } else {
        try {
            const project = await Projects.update(id, body);
            res.status(200).json(project)
        } catch  {
            next()
        }
    }
})
      

router.delete('/:id',validateProjectsId, async (req, res, next ) => {
try {
 await Projects.remove(req.params.id)
    res.json(req.project)
} catch (err) {
  next(err)
 }
      
  });

  router.get('/:id/actions',(req, res,next) => {
    Projects.getProjectActions(req.params.id)
            .then(project => {
                if (project) {
                    res.json(project)
                    
                } else {
                    res.status(404)
                    
                }

            })
            .catch(next)

  })

module.exports = router;
