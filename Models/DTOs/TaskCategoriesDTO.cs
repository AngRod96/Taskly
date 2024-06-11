using System.ComponentModel.DataAnnotations;

namespace Taskly.Models.DTOs;

public class TaskCategoriesDTO
{
    [Required]
    public int CategoryId { get; set; }
    [Required]
    public int TaskId { get; set; }
    public TaskObjDTO TaskObj { get; set; }
    public CategoryDTO Category { get; set; }

}