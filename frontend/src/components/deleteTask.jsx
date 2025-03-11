import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const DeleteTask = ({ task, onDelete }) => {
    const handleDelete = async () => {
        try {
            // If task has no _id, it's a new task that hasn't been saved to DB
            if (!task._id) {
                onDelete(task);
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/${task._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            
            onDelete(task._id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button variant="contained" onClick={handleDelete}>
            Delete
        </Button>
    );
}

export default DeleteTask;
