namespace Domain
{
    public class ProductsInvoices
    {

        public Guid productId { get; set; }
        public Product product { get; set; }
        public Guid invoiceId { get; set; }
        public Invoice invoice { get; set; }
        public int Quantity { get; set; }

    }
}