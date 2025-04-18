using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesPrediction.Core.Interfaces;
using SalesPrediction.Infrastructure.Context;

namespace SalesPrediction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IRepository<Employee> _employeeRepo;
        public EmployeesController(IRepository<Employee> employeeRepo) => _employeeRepo = employeeRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _employeeRepo.GetAllAsync();
            return Ok(employees.Select(e => new { e.Empid, FullName = e.Firstname + " " + e.Lastname }));
        }
    }
}
