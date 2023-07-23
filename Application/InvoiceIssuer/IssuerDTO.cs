namespace Application.InvoiceIssuer
{
    public class IssuerDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; } // CNP/CUI
        public string CompanyRegNo { get; set; } //NrRegCom
        public string Address { get; set; }
        public string IBAN { get; set; }
        public string Bank { get; set; }

    }
}