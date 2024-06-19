import React, { useEffect, useState } from 'react';
import { getCompletedTasks, deleteTask } from '../../managers/TaskManager.js';

export const CompletedTasks = ({ loggedInUser }) => {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
   
        getCompletedTasks(loggedInUser.id).then((data) => {
            setCompletedTasks(data)
            console.log(data)
        });

    }, [loggedInUser]);

    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                deleteTask(taskId);
                getCompletedTasks(loggedInUser.id).then(setCompletedTasks);
            } catch (error) {
                console.error("Error deleting task", error);
            }
        }
    };

    return (
        <div>
            <h1>Completed Tasks</h1>
            <ul className="completed-tasks">
                {completedTasks.map((task) => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                         {task.taskCategories.map((c) => {
                            return(<p> Category:{c.category.categoryName}</p>)
                        })}
                        <p>Important: {task.isImportantTask ? 'Yes' : 'No'}</p>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};