import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const EditTask = ({task, onEdit}) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [edit, setEdit] = useState(false);

    const handleEdit = async () => {
        const updatedTask = {
            _id: task._id,
            title: title,
            description: description,
            completed: task.completed
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/${updatedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            const data = await response.json();
            console.log(data);
            setEdit(false);
            onEdit(updatedTask);
            return {success: true, message: "Task updated successfully"};
        }
        catch(error) {
            console.error('Error editing task:', error);
        }
    }

    return (
        <>
            <Button onClick={() => setEdit(!edit)} >Edit</Button>
            {edit && (
                <Dialog open={edit} onClose={() => setEdit(false)}>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEdit}>Save</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}   

export default EditTask;
