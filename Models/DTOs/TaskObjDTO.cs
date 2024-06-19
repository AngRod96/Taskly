namespace Taskly.Models.DTOs;

public class TaskObjDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public bool CompletedTask { get; set; }
    public bool IsImportantTask { get; set; }
    public List<TaskCategoriesDTO>? TaskCategories{ get; set; }


}