namespace Application.Customers
{
    public class CustomerDTO
    {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; } // CNP/CUI
        public string CompanyRegNo { get; set; } //NrRegCom
        public string Address { get; set; }
        public string IBAN { get; set; }
        public string Bank { get; set; }
        public int Type { get; set; }  //0-Company, 1-private

    }
}