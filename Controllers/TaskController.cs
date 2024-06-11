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

namespace Tabloid.Controllers;

    [HttpGet]
    
    public IActionResult GetAllTasks()
    {
        return Ok(
            _dbContext
                .TaskObj.Include(t => t.Id)
                .Include(t => t.Title)
                .Include(t => t.Description)
                .ThenInclude(p => p.Tag)
                .Select(p => new GetPostsDTO(p))
        );
    }
