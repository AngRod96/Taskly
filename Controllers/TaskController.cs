using System.Net.Sockets;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks.Sources;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.VisualBasic;
using Taskly.Data;
using Taskly.Models;
using Taskly.Models.DTOs;

namespace Taskly.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private TasklyDbContext _dbContext;

        public TasksController(TasklyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{id}/task")]
        public IActionResult GetAllTasks(int id)
        {
            return Ok(
                _dbContext
                .Tasks.Include(t => t.TaskCategories)
                .ThenInclude(tc => tc.Category)
                .Where(t => t.UserId == id)
                .Select(t => new TaskObjDTO
                {
                    Id = t.Id,
                    UserId = t.UserId,
                    Title = t.Title,
                    Description = t.Description,
                    TaskCategories = t.TaskCategories.Select(tc => new TaskCategoriesDTO
                    {
                        CategoryId = tc.CategoryId,
                        TaskId = tc. TaskId,
                        Category = new CategoryDTO
                        {
                            Id = tc.Category.Id,
                            CategoryName = tc.Category.CategoryName
                        }
                    }).ToList(),
                    IsImportantTask = t.IsImportantTask,
                    CompletedTask = t.CompletedTask

                })
                .ToList());
        }



        [HttpPost]
        public IActionResult CreateATask(CreateTasktDTO taskPosted)
        {
            TaskObj task = new TaskObj
            {
                Title = taskPosted.Title,
                Description = taskPosted.Description,
                CompletedTask = taskPosted.CompletedTask,
                Date = DateTime.Now,
                IsImportantTask = taskPosted.IsImportantTask,
                UserId = taskPosted.UserId
            };

            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();

            foreach (int CategoryId in taskPosted.CategoryIds)
            {
                TaskCategories newTasks = new TaskCategories
                {
                    TaskId = task.Id,
                    CategoryId = CategoryId
                };
                _dbContext.TaskCategories.Add(newTasks);

            }
            _dbContext.SaveChanges();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            TaskObj taskToDelete = _dbContext.Tasks.FirstOrDefault(t => t.Id == id);

            if (taskToDelete == null)
            {
                return BadRequest();
            }

            _dbContext.Tasks.Remove(taskToDelete);
            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpPut("{id}")]

        public IActionResult EditTask(int id, [FromBody] CreateTasktDTO editTask)
        {
            TaskObj taskToEdit = _dbContext.Tasks
                 .FirstOrDefault(t => t.Id == id);

            if (taskToEdit == null)
            {
                return BadRequest("Task not found");
            }

            taskToEdit.Title = editTask.Title;
            taskToEdit.Description = editTask.Description;
            taskToEdit.CompletedTask = editTask.CompletedTask;
            taskToEdit.IsImportantTask = editTask.IsImportantTask;

            List<TaskCategories> tasksCategoriesToRemove = _dbContext.TaskCategories.Where(t => t.TaskId == id).ToList();

            foreach ( TaskCategories taskCategory in tasksCategoriesToRemove) 
            {
                _dbContext.TaskCategories.Remove(taskCategory);
            }

            _dbContext.SaveChanges();

            foreach(int CategoryId in editTask.CategoryIds)
            {
                _dbContext.TaskCategories.Add(new TaskCategories()
                {
                    TaskId = taskToEdit.Id, CategoryId = CategoryId
                });
            }

            _dbContext.SaveChanges();

            return Ok(taskToEdit);
        }


        [HttpGet("{id}")]

        public IActionResult GetTaskById(int id)
        {
            TaskObj taskById = _dbContext.Tasks
            .Include(t => t.TaskCategories)
                .ThenInclude(t => t.Category)
            .FirstOrDefault(t => t.Id == id);

            if (taskById == null)
            {
                return NotFound("The task wasnt found");
            }
            return Ok(
                new TaskObjDTO
                {
                    Title = taskById.Title,
                    Id = taskById.Id,
                    Description = taskById.Description,
                    CompletedTask = taskById.CompletedTask,
                    Date = DateTime.Now,
                    IsImportantTask = taskById.IsImportantTask,
                    UserId = taskById.UserId,
                    TaskCategories = taskById.TaskCategories.Select(tc => new TaskCategoriesDTO{
                        CategoryId = tc.CategoryId,
                        TaskId = tc.TaskId,
                        Category = new CategoryDTO
                        {
                            Id = tc.CategoryId,
                            CategoryName = tc.Category.CategoryName
                        }
                    }).ToList()
                }
            );

        }


    [HttpGet("complete/{id}")]
    public IActionResult getCompletedTasks(int id)
    {
        List<TaskObjDTO> completedTasks= _dbContext.Tasks
        .Include(t => t.TaskCategories)
            .ThenInclude(tc => tc.Category )
        .Where(t => t.CompletedTask && t.UserId ==id ).Select(t => new TaskObjDTO {
            Id = t.Id,
            UserId = t.UserId,
            Title = t.Title,
            Description = t.Description,
            TaskCategories = t.TaskCategories.Select(tc => new TaskCategoriesDTO
            {
                CategoryId = tc.CategoryId,
                TaskId = tc.TaskId,
                Category = new CategoryDTO
                {
                    Id = tc.Category.Id,
                    CategoryName = tc.Category.CategoryName
                    
                }
            }).ToList(),
            IsImportantTask = t.IsImportantTask,
            CompletedTask = t.CompletedTask
        }).ToList();
        return Ok(completedTasks);
    }

        // [HttpPut("completed-status/{id}")]
        // public IActionResult completedStatus(int id, [FromForm] bool completedTasks)
        // {
        //     TaskObj task = _dbContext.Tasks.FirstOrDefault(t => t.Id == id);
        //     if (task == null)
        //     {
        //         return NotFound();
        //     }

        //     task.CompletedTask = completedTasks;
        //     _dbContext.SaveChanges();

        //     return Ok(task);
        // }


    }


}
