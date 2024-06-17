export const getAllTasks = (id) => 
{
    return fetch(`/api/tasks/${id}/task`).then(res => res.json())
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

export const getTaskById = (id) => 
{
    return fetch(`/api/tasks/${id}`).then(res => res.json())
}

export const updateTask = async (id, taskData) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(taskData)
    })
}