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
    public class CustomersController : ControllerBase
    {
        private readonly IRepository<Customer> _customerRepo;

        public CustomersController(IRepository<Customer> customerRepo)
        {
            _customerRepo = customerRepo;
        }

        [HttpGet("predictions")]
        public async Task<IActionResult> GetCustomerPredictions([FromServices] StoreSampleContext context)
        {
            var customers = await context.Customers
                .Include(c => c.Orders)
                .ToListAsync();

            var result = customers
                .Where(c => c.Orders != null && c.Orders.Count >= 2)
                .Select(c =>
                {
                    var orderedDates = c.Orders
                        .Where(o => o.Orderdate != null)
                        .OrderBy(o => o.Orderdate)
                        .Select(o => (DateTime)o.Orderdate)
                        .ToList();

                    var intervals = new List<int>();
                    for (int i = 1; i < orderedDates.Count; i++)
                    {
                        intervals.Add((orderedDates[i] - orderedDates[i - 1]).Days);
                    }

                    var avgDays = intervals.Count > 0 ? intervals.Average() : 0;
                    var lastOrder = orderedDates.LastOrDefault();

                    return new
                    {
                        c.Custid,
                        CustomerName = c.Companyname,
                        LastOrderDate = lastOrder,
                        NextPredictedOrder = lastOrder.AddDays(avgDays)
                    };
                })
                .ToList();

            return Ok(result);
        }




        [HttpGet("{customerId}/orders")]
        public async Task<IActionResult> GetOrdersByCustomer(int customerId, [FromServices] IRepository<Order> orderRepo)
        {
            var orders = await orderRepo.GetAllAsync();
            var filtered = orders.Where(o => o.Custid == customerId)
                .Select(o => new {
                    o.Orderid,
                    o.Requireddate,
                    o.Shippeddate,
                    o.Shipname,
                    o.Shipaddress,
                    o.Shipcity
                });
            return Ok(filtered);
        }
    }
}
