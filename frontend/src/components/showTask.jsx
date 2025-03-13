import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from "react";
import CompleteTask from './completeTask';
import EditTask from './editTask';
import DeleteTask from './deleteTask';
import AddTasks from './addTasks';

const ShowTask = () => {
    const [taskList, setTaskList] = useState([]);

    const handleEdit = (updatedTask) => {
        setTaskList((prevTasks) =>
            prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task)
        );      
    }

    const handleAdd = (newTask) => {
        setTaskList((prevTasks) => [...prevTasks, newTask]);
    }

    const handleDelete = (taskId) => {
        setTaskList((prevTasks) =>
            prevTasks.filter(task => task._id !== taskId)
        );
    }
    
    useEffect(() => {
        const fetchTasks = async() => {
            try {
                console.log(import.meta.env.VITE_LOCAL_URL);
                const result = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!result.ok) {
                    throw new Error('Failed to get tasks');
                }
                const response = await result.json();
                console.log(response.data);
                const res = Array.isArray(response.data) ? response.data : [];
                setTaskList(res);
                return {success: true, message: "Getting tasks sucessfully"};
            }
            catch (error) {
                console.error(error.message);
            }
        }
    
        fetchTasks();
    }, []);

    return (
        <div style={{ margin: "20px", maxWidth: "800px", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
            <AddTasks onAdd={handleAdd} />
            <div style={{marginBottom: "20px"}}>
                <h1 style={{textAlign: "center"}}>Your Tasks</h1>
                <List>
                    {taskList.map((task, index) => (
                        <ListItem key={task._id || index}>
                            <ListItemText primary={task.title} secondary={task.description} />
                            <CompleteTask task={task} />
                            <EditTask task={task} onEdit={handleEdit} />
                            <DeleteTask task={task} onDelete={handleDelete} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
    
}

export default ShowTask;
