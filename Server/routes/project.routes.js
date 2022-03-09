const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");

router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((allProjects) => res.json(allProjects))
    .catch((err) => res.json(err));
});

router.post("/projects", (req, res, next) => {
  const { title, description } = req.body;

  Project.create({ title, description, 
   })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(projectId)
  .populate('tasks')
  .then(project => res.status(200).json(project))
  .catch(error => res.json(error));
});

router.put('/projects/:projectId', (req, res, next) => {
  const { projectId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch(error => res.json(error));
});


router.delete('/projects/:projectId', (req, res, next) => {
  const { projectId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Project.findByIdAndRemove(projectId)
    .then(() => res.json({ message: `Project with ${projectId} is removed successfully.` }))
    .catch(error => res.json(error));
});

module.exports = router;
