namespace Taskly.Models.DTOs;

public class CreateTasktDTO
{

    public List<int>? CategoryIds { get; set; }
     public int UserId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool CompletedTask { get; set; }
    public bool IsImportantTask { get; set; }
    public List<TaskCategoriesDTO>? TaskCategory { get; set; }
}