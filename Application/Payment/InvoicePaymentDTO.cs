namespace Application.Payment
{
    public class InvoicePaymentDTO
    {
        public Guid Id { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentType { get; set; }
        public decimal AmmountPaid { get; set; }

    }
}