﻿using SalesPrediction.Infrastructure.Context;
using System;
using System.Collections.Generic;

namespace SalesPrediction.Core.Entities;

public partial class Category
{
    public int Categoryid { get; set; }

    public string Categoryname { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
