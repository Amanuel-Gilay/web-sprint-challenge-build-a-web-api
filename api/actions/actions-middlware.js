// add middlewares here related to actions
const actions = require("./actions-model");
async function validateactonsId (req, res, next) {
    try {
        const actions = await actionss.get(req.params.id)
        if (!actions) {
            res.status(404).json({ message: 'no such user'})
        } else {
            req.actions = actions
            res.json(actions)
            next()
        }
    } catch (error) {
        next()
    }
}
function validateactionsId (req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({ message: 'body is missing name'})
    } else {
        next()
    }
}
module.exports= {validateactionsId, validateacton}