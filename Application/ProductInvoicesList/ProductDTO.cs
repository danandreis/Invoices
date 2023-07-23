using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ProductInvoicesList
{
    public class ProductDTO
    {

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string UM { get; set; } //UM = Unit Measure

        public decimal price { get; set; }
        public string Description { get; set; }

    }
}