namespace Domain
{
    public class Invoice
    {

        public Guid Id { get; set; }
        public string Series { get; set; }
        public int Number{ get; set; }
        public DateTime IssueDate { get; set; }
        public Guid customerId { get; set; }
        public Customer customer { get; set; }
        public Guid issuerId { get; set; }
        public Issuer issuer { get; set; }
        public decimal InvoiceAmmount { get; set; }
        public int Paid { get; set; } //1 or 0 as the Invoice is paid or not
        public List<ProductsInvoices> productsInvoices { get; set; }
        public List<InvoicePayment> invoicePayments { get; set; }

    }
}