// add middlewares here related to projects
const Projects = require("./projects-model");
async function validateProjectsId (req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({ message: 'no such user'})
        } else {
            req.project = project
            res.json(project)
            next()
        }
    } catch (error) {
        next()
    }
}
function validatePoject (req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({ message: 'body is missing name'})
    } else {
        next()
    }
}
module.exports= {validateProjectsId, validatePoject}