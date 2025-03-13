import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const AddTasks = ({onAdd}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleAddTask = async () => {
        if (!title || !description) {
            alert("Title and description are required");
            return;
        }
        const newTask = {title, description, completed};
        try {
            const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });
            if (!response.ok) {
                throw new Error("Failed to add task");
            }
            const data = await response.json();
            console.log("Task added successfully:", data);
            setTitle("");
            setDescription("");
            setCompleted(false);
            onAdd(data.data);
            return {success: true, message: "Task added successfully"};
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }
    
    return (
        <div style={{marginBottom: "20px", display: "flex", justifyContent: "center"}}>
            <Box sx={{display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center"}}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{width: "200px"}}
                />  
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{width: "200px"}}
                />
                <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
            </Box>
        </div>
    );
    
}

export default AddTasks;
