namespace Domain
{
    public class Product
    {

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string UM { get; set; } //UM = Unit Measure

        public decimal price { get; set; }
        public string Description { get; set; }

        public List<ProductsInvoices> productsInvoices { get; set; }

    }
}