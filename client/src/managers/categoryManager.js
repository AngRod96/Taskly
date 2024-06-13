export const getAllCategories = () =>
{
    return fetch("/api/category").then(res => res.json())
}