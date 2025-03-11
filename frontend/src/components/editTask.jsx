import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const EditTask = ({ task, onClose, onUpdate }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [editingTask, setEditingTask] = useState(task);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    ...task,
                    title, 
                    description 
                })
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const updatedTask = await response.json();
            onUpdate(updatedTask.data);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={() => setIsEditing(true)}>
                Edit
            </Button>
            <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '400px', mt: 2 }}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleEdit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditTask;