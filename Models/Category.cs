
namespace Taskly.Models;

public class Category
{
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public List<TaskCategories>? TaskCategories { get; set; }
}