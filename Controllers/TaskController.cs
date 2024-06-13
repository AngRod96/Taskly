using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            return Ok(
                _dbContext
                .Tasks
                .Select(t => new TaskObjDTO
                {
                    Id = t.Id,
                    UserId = t.UserId,
                    Title = t.Title,
                    Description = t.Description,
                    TaskCategories = t.TaskCategories,
                    IsImportantTask = t.IsImportantTask,
                    CompletedTask = t.CompletedTask

                })
                .ToList());
        }



        [HttpPost]
        public IActionResult CreateATask( CreateTasktDTO taskPosted)
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

    }

}