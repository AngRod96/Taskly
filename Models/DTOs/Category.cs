
namespace Taskly.Models.DTOs;

public class CategoryDTO
{
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public List<TaskCategories> TaskCategories { get; set; }
}