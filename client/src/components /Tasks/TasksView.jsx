import { useEffect, useState } from "react"
import { getAllTasks } from "../../managers/TaskManager.js"

export const AllTasks = () => {
    const [task, setTasks] = useState([])

    useEffect(() => 
    {
        getAllTasks().then(setTasks);
    }, [])

    return (
        <div>
            <h1>All Tasks</h1>
            {task.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                <ul>
                    {task.map((task) => (
                        <li key={task.id}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Completed: {task.completedTask ? 'Yes' : 'No'}</p>
                            <p>Important: {task.isImportantTask ? 'Yes' : 'No'}</p>
                            <p>Date: {new Date(task.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
