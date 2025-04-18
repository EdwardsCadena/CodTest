using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesPrediction.Core.Entities;
using SalesPrediction.Core.Interfaces;
using SalesPrediction.Infrastructure.Context;

namespace SalesPrediction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IRepository<Product> _productRepo;
        public ProductsController(IRepository<Product> productRepo) => _productRepo = productRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productRepo.GetAllAsync();
            return Ok(products.Select(p => new { p.Productid, p.Productname }));
        }
    }
}
