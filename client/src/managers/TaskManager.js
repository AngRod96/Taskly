export const getAllTasks = () => 
{
    return fetch(`/api/tasks`).then(res => res.json())
}

export const createTask = (task) => 
{
    return fetch(`/api/tasks`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
    
}

export const deleteTask = (taskId) => 
{
    return fetch(`/api/tasks/${taskId}`,
        {method: "DELETE"})
    
}