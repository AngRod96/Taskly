export const getAllTasks = () => 
{
    return fetch(`/api/tasks`).then(res => res.json())
}