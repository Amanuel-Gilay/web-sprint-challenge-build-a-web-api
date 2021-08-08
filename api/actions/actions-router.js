// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { validateActionsId, validateActions } = require('./actions-middlware')
const router = express.Router();


router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})


router.get('/:id', validateActionsId, (req, res) => {
    res.json(req.actions)
})


router.post('/', validateActions, (req, res, next) => {
    Actions.insert(req.body)
    .then(post => {
        res.json(post)
    })
    .catch(next)
})


router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const body = req.body;
    if (!body.notes || !body.description) {
        res.status(400).json({message: 'fields required'})
    } else {
        try {
            const action = await Actions.update(id, body);
            res.status(200).json(action)
        } catch  {
            next()
        }
    }
})

        
router.delete('/:id',validateActionsId,async (req, res, next ) => {
try {
 await Actions.remove(req.params.id)
    res.json(req.project)
} catch (err) {
  next(err)
 }
      
  });

 module.exports = router;