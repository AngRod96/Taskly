using System.ComponentModel.DataAnnotations;

namespace Taskly.Models.DTOs;

public class TaskCategoriesDTO
{

    public int CategoryId { get; set; }

    public int TaskId { get; set; }
    public TaskObjDTO? TaskObj { get; set; }
    public CategoryDTO? Category { get; set; }


}