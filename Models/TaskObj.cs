namespace Taskly.Models;

public class TaskObj
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public bool CompletedTask { get; set; }
    public bool IsImportantTask { get; set; }
    public List<TaskCategories> TaskCategories{ get; set; }

}