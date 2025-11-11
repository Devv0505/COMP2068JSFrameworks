var express = require('express');
var router = express.Router();

let projects = [
  { name: "Fitness Tracker App", dueDate: "2025-11-30", course: "COMP2068" },
  { name: "Angular SPA Project", dueDate: "2025-12-10", course: "COMP2077" },
  { name: "Node.js Final Assignment", dueDate: "2025-12-20", course: "COMP2081" }
];

// ✅ GET all projects
router.get('/', (req, res) => {
  res.status(200).json(projects);
});

// ✅ POST new project
router.post('/', (req, res) => {
  const newProject = req.body;
  if (!newProject.name || !newProject.dueDate || !newProject.course) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  projects.push(newProject);
  res.status(201).json({ message: 'Project added successfully!', projects });
});

module.exports = router;
