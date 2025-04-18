using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesPrediction.Core.Entities;
using SalesPrediction.Core.Interfaces;

namespace SalesPrediction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippersController : ControllerBase
    {
        private readonly IRepository<Shipper> _shipperRepo;
        public ShippersController(IRepository<Shipper> shipperRepo) => _shipperRepo = shipperRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var shippers = await _shipperRepo.GetAllAsync();
            return Ok(shippers.Select(s => new { s.Shipperid, s.Companyname }));
        }
    }
}
