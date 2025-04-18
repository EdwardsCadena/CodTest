using SalesPrediction.Infrastructure.Context;
using System;
using System.Collections.Generic;

namespace SalesPrediction.Core.Entities;


public partial class CustOrder
{
    public int? Custid { get; set; }

    public DateTime? Ordermonth { get; set; }

    public int? Qty { get; set; }
}
