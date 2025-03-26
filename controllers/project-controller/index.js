import { projects } from "../../config/mockDb.js";

// Create a new project
export const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.length < 2) {
            return res.status(400).json({ message: 'Project name must be at least 2 characters long' });
        }

        if (projects.some(proj => proj.name.toLowerCase() === name.toLowerCase())) {
            return res.status(400).json({ message: 'Project name already exists' });
        }

        const newProject = { id: projects.length + 1, name };
        projects.push(newProject);

        res.status(201).json({ message: 'Project created successfully!', newProject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing project
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || name.length < 2) {
            return res.status(400).json({ message: 'Project name must be at least 2 characters long' });
        }

        if (projects.some(proj => proj.id != id && proj.name.toLowerCase() === name.toLowerCase())) {
            return res.status(400).json({ message: 'Project name already exists' });
        }

        const projectIndex = projects.findIndex(proj => proj.id == id);
        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }

        projects[projectIndex] = { ...projects[projectIndex], name };
        res.status(200).json({ message: 'Project updated successfully!', updatedProject: projects[projectIndex] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a project
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const projectIndex = projects.findIndex(proj => proj.id == id);
        
        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        const deletedProject = projects.splice(projectIndex, 1)[0];

        // Reset IDs sequentially
        projects.forEach((proj, index) => {
            proj.id = index + 1; // Ensuring IDs start from 1
        });

        res.status(200).json({ message: 'Project deleted successfully!', deletedProject, updatedProjects: projects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get project count
export const getCount = async (req, res) => {
    try {
        res.status(200).json({ count: projects.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all projects
export const getAll = async (req, res) => {
    try {
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
