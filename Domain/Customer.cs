using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Customer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; } // CNP/CUI
        public string  CompanyRegNo { get; set; } //NrRegCom
        public string Address { get; set; }
        public string IBAN { get; set; }
        public string Bank { get; set; }
        public int Type { get; set; }  //0-PF, 1-PJ
        public List<Invoice> Invoices { get; set; }
    }
}