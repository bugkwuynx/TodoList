import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

const CompleteTask = ({task}) => {
    const [completed, setCompleted] = useState(task.completed);

    const handleChange = async () => {
        const updatedTask = {
            _id: task._id,
            title: task.title,
            description: task.description,
            completed: !completed
        }
        try {
            console.log(updatedTask);
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
            setCompleted(data.data.completed);   
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <Checkbox onChange={handleChange} checked={completed}/>
    );
}

export default CompleteTask;
