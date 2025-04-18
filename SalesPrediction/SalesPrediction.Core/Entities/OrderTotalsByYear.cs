using SalesPrediction.Infrastructure.Context;
using System;
using System.Collections.Generic;

namespace SalesPrediction.Core.Entities;



public partial class OrderTotalsByYear
{
    public int? Orderyear { get; set; }

    public int? Qty { get; set; }
}
