using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.VisualBasic;
using Taskly.Data;
using Taskly.Models;
using Taskly.Models.DTOs;

namespace Taskly.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CreateCategoryController : ControllerBase
{
    private TasklyDbContext _dbContext;

    public CreateCategoryController(TasklyDbContext context)
    {
        _dbContext = context;
    }


    // [HttpPost]
    // public IActionResult CategoryList(CategoryListDTO newCategoryList)
    // {
    //     Category category = new Category()
    //     {

    //     };
    // }
}