import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const CompleteTask = ({ task }) => {
    const [completed, setCompleted] = useState(task.completed);
    const [newTasks, setNewTasks] = useState([]);
    const [dbTasks, setDbTasks] = useState([]);

    const handleTaskComplete = async (task, index) => {
        try {
            if (!task._id) {
                const updatedNewTasks = [...newTasks];
                updatedNewTasks[index].completed = !task.completed;
                return;
            }

            // Update in the backend
            const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...task,
                    completed: !task.completed
                })
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            // Update local state
            const updatedTasks = dbTasks.map(t => 
                t._id === task._id ? { ...t, completed: !task.completed } : t
            );
            setDbTasks(updatedTasks);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Checkbox checked={completed} onChange={(e) => {
            setCompleted(e.target.checked);
            handleTaskComplete(task);
        }}></Checkbox>
    );
};

export default CompleteTask;

