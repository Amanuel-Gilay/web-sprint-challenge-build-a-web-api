// // add middlewares here related to actions
const Actions = require("./actions-model");
async function validateActionsId (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({ message: 'no such user'})
        } else {
            req.action = action
            res.json(action)
            next()
        }
    } catch (error) {
        next()
    }
}
function validateActions (req, res, next) {
    const { notes , description } = req.body
    if (!notes && !description) {
        res.status(400).json({ message: 'body is missing name'})
    } else {
        next()
    }
}
module.exports= {validateActionsId, validateActions}