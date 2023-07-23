using Application.Customers;
using Application.Payment;
using Application.ProductInvoicesList;

namespace Application.InvoiceIssuer
{
    public class InvoiceDTO
    {

        public Guid Id { get; set; }
        public string Series { get; set; }
        public int Number { get; set; }
        public DateTime IssueDate { get; set; }
        public Guid customerId { get; set; }
        public CustomerDTO customer { get; set; }
        public IssuerDTO issuer { get; set; }
        public decimal InvoiceAmmount { get; set; }
        public int Paid { get; set; } //1 or 0 as the Invoice is paid or not
        public List<ProductsInvoicesDTO> productsInvoices { get; set; }
        public List<InvoicePaymentDTO> invoicePayments { get; set; }

    }
}