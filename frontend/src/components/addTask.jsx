import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddTask = ({addTask}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!title || !description) {
                alert("Title and description are required");
                return;
            }
            console.log(import.meta.env.VITE_LOCAL_URL);
            const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, description, completed})
            });
            if (!response.ok) {
                throw new Error("Failed to add task");
            }
            addTask({title, description, completed});
            setTitle("");
            setDescription("");
            setCompleted(false);
            return {success: true, message: "Task added successfully"};
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Add Task</h2>
            <form style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }} onSubmit={handleSubmit}>
                <TextField variant="standard" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField variant="standard" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Button variant="contained" type="submit" sx={{ height: "55px", alignSelf: "center" , width: "150px"}}>Add Task</Button>
            </form>
        </div>
    )
}   

export default AddTask;
