namespace Taskly.Models;

public class TaskCategories
{
    public int CategoryId { get; set; }
    public int TaskId { get; set; }
    public TaskObj? TaskObj { get; set; }
    public Category? Category { get; set; }

}