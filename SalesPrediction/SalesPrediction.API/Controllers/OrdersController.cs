using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesPrediction.Core.DTOs;
using SalesPrediction.Core.Entities;
using SalesPrediction.Core.Interfaces;
using SalesPrediction.Infrastructure.Context;

namespace SalesPrediction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IRepository<Order> _orderRepo;
        private readonly IRepository<OrderDetail> _detailRepo;
        private readonly StoreSampleContext _context;

        public OrdersController(IRepository<Order> orderRepo, IRepository<OrderDetail> detailRepo, StoreSampleContext context)
        {
            _orderRepo = orderRepo;
            _detailRepo = detailRepo;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] NewOrderDto dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var order = new Order
                {
                    
                    Empid = dto.EmpId,
                    Shipperid = dto.ShipperId,
                    Shipname = dto.ShipName,
                    Shipaddress = dto.ShipAddress,
                    Shipcity = dto.ShipCity,
                    Shipcountry = dto.ShipCountry,
                    Orderdate = DateTime.Now,
                    Requireddate = dto.RequiredDate,
                    Shippeddate = dto.ShippedDate,
                    Freight = dto.Freight
                };

                await _orderRepo.AddAsync(order);

                var detail = new OrderDetail
                {
                    Orderid = order.Orderid,
                    Productid = dto.ProductId,
                    Unitprice = dto.UnitPrice,
                    Qty = (short)dto.Quantity,
                    Discount = (decimal)dto.Discount
                };

                await _detailRepo.AddAsync(detail);
                await transaction.CommitAsync();

                return Ok(new { order.Orderid });
            }
            catch
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Error creating order.");
            }
        }
    }
}
