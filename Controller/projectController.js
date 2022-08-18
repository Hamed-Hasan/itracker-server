import Project from "../model/projectSchema.js";

//add project api
export const addProject = async (req, res) => {
    const exist = await Project.findOne({ projectName: req.body.projectName })
    try {
        if (exist) {
            return res.status(401).json({ message: 'Project already exist' })
        } else {
            const project = req.body;
            const newProject = new Project(project);
            await newProject.save();
            res.status(200).json({ message: project })
        }
    } catch (err) {
        console.log(res.status(500).json({ message: err.message }))
    }
}

export const getProject = async (req, res) => {
    try {
        const projects = await Project.find({});
        // console.log(projects)
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
