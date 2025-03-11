import Task from "../models/task.model.js";
import mongoose from "mongoose";

// get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({success: true, data: tasks});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}   

// create a new task
export const createTask = async (req, res) => {
    try {
        const {title, description} = req.body;
        if (!title || !description) {
            return res.status(400).json({message: "Title and description are required"});
        }
        
        const newTask = new Task({title, description});
        await newTask.save();
        res.status(201).json({success: true, data: newTask});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

// update a task
export const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({success: false, message: "Invalid task ID"});
        }
        const updatedTask = await Task.findByIdAndUpdate(id, {title, description, completed}, {new: true});
        res.status(200).json({success: true, data: updatedTask});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// delete a task    
export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({success: false, message: "Invalid task ID"});
        }
        await Task.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Task deleted successfully"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}