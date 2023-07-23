using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class InvoicePayment
    {
        public Guid Id { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentType { get; set; }
        public decimal AmmountPaid { get; set; }
        public Guid invoiceId { get; set; }
        public Invoice invoice { get; set; }

    }
}