using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesPrediction.Core.DTOs
{
    public class NewOrderDto
    {
        
        public int EmpId { get; set; }
        public int ShipperId { get; set; }
        public string ShipName { get; set; } = string.Empty;
        public string ShipAddress { get; set; } = string.Empty;
        public string ShipCity { get; set; } = string.Empty;
        public string ShipCountry { get; set; } = string.Empty;
        public DateTime RequiredDate { get; set; }
        public DateTime ShippedDate { get; set; }
        public decimal Freight { get; set; }
        public int ProductId { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public float Discount { get; set; }
    }
}
