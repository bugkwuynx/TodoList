import express from "express";
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

// get all tasks
router.get("/", getAllTasks);

// create a new task
router.post("/", createTask);

// update a task
router.put("/:id", updateTask);

// delete a task
router.delete("/:id", deleteTask);

export default router;
