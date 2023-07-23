namespace Domain
{
    public class InvoiceSeries
    {


        public Guid Id { get; set; }
        public DateTime AllocationDate { get; set; }
        public string Series { get; set; }
        public int StartNo { get; set; }
        public int EndNo { get; set; }
        public int CurrentNo { get; set; }
        public int Active { get; set; }

    }
}