import AddTask from "./components/addTask";
import ShowTask from "./components/showTask";
import { useState } from "react";

function App() {
  // Only store tasks that are newly added and not yet synced with the database
  const [newTasks, setNewTasks] = useState([]);

  const addTask = (task) => {
    // Add the task to newTasks state
    setNewTasks((prevTasks) => [...prevTasks, task]);
  }

  const handleNewTasksChange = (updatedNewTasks) => {
    setNewTasks(updatedNewTasks);
  }

  return (
    <>
      <AddTask addTask={addTask} />
      <ShowTask newTasks={newTasks} onNewTasksChange={handleNewTasksChange} />
    </>
  )
}

export default App;
