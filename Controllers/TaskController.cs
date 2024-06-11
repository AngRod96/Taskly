using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.VisualBasic;
using Taskly.Data;
using Taskly.Models;
using Taskly.Models.DTOs;

namespace Tabloid.Controllers
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
                    TaskCategories = t.TaskCategories

                })
                .ToList());
        }
        
    }
}