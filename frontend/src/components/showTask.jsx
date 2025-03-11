import { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import EditTask from "./editTask";
import CompleteTask from "./completeTask";
import DeleteTask from "./deleteTask";

const ShowTask = ({ newTasks = [], onNewTasksChange }) => {
    const [dbTasks, setDbTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                setDbTasks(result.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchTasks();
    }, []);
    
    const handleDeleteTask = (taskOrId) => {
        if (typeof taskOrId === 'string') {
            // Handle deletion of existing task (by ID)
            setDbTasks(dbTasks.filter(task => task._id !== taskOrId));
        } else {
            // Handle deletion of new task (by task object)
            const updatedNewTasks = newTasks.filter(t => 
                t.title !== taskOrId.title || t.description !== taskOrId.description
            );
            onNewTasksChange(updatedNewTasks);
        }
    };

    const handleUpdateTask = (updatedTask) => {
        setDbTasks(dbTasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    };

    // Combine database tasks with new tasks
    const allTasks = [...dbTasks, ...newTasks];

    return (
        <div style={{ width: "600px", margin: "0 auto" }}>
            <h2>Tasks</h2>
            <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {Array.isArray(allTasks) && allTasks.map((task, index) => (
                    <ListItem key={task._id || `new-${index}`} sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <ListItemText 
                            primary={task.title} 
                            secondary={task.description}
                        />
                        <CompleteTask task={task} />
                        <DeleteTask task={task} onDelete={handleDeleteTask} />
                        <EditTask task={task} onClose={() => setEditingTask(null)} onUpdate={handleUpdateTask} />
                    </ListItem>
                ))}
            </List>
            {editingTask && (
                <EditTask
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onUpdate={handleUpdateTask}
                />
            )}
        </div>
    );
}

export default ShowTask;
