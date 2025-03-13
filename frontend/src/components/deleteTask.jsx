import { Button } from "@mui/material";

const DeleteTask = ({task, onDelete}) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tasks/${task._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            const data = await response.json();
            console.log(data);
            onDelete(task._id);
            return {success: true, message: "Task deleted successfully"};

        }
        catch (error) {
            console.error(`Error deleting task: ${error.message}`);
        }
    }

    return (
        <>
            <Button onClick={handleDelete}>Delete</Button>
        </>
    );
}

export default DeleteTask;  
