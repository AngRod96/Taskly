import { useEffect, useState } from "react"
import { deleteTask, getAllTasks } from "../../managers/TaskManager.js"
import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"



export const AllTasks = () => {
    const [task, setTasks] = useState([])

    useEffect(() => 
    {
        getAllTasks().then(setTasks);
    }, [])

    const handleDelete = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(taskId)
                Navigate("/");
            } catch (error)
            {
                console.error("error deleting task", error)
            }
        }
        }
    

    return (
        <div>
            <h1>All Tasks</h1>
            {task.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                   
                <ul>
                        {task.map((task) => (
                        <>
                        <li key={task.id}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Completed: {task.completedTask ? 'yes' : 'No'}</p>
                            <p>Important: {task.isImportantTask ? 'Yes' : 'No'}</p>
                            <p>Date: {new Date(task.date).toLocaleString()}</p>
                                    <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>   
                        </>
                        
                    ))}
                    </ul>
                   
            )}
              <Link to="/create-Task">
                                <button>Add Task</button>
                </Link>      
            
        </div>
    );
}
