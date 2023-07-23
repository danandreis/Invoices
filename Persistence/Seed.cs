using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedCustomers(DataContext context)
        {
            if (context.customers.Any()) return;

            var customers = new List<Customer>
            {
                new Customer
                {
                    Name = "Popescu Ion",
                    Code = "1451104586215",
                    CompanyRegNo= "-",
                    Address = "Bucuresti"
                },
                new Customer
                {
                    Name = "Nicolae Georgeta",
                    Code = "2780901452836",
                    CompanyRegNo= "-",
                    Address = "Pitesti"
                },
                new Customer
                {
                    Name = "IT TECH 2012 SRL",
                    Code = "RO125478",
                    CompanyRegNo= "J40/1258/2012",
                    Address = "Bucuresti"
                },
                new Customer
                {
                    Name = "PRODUCTIE PUBLICITARA SRL",
                    Code = "RO12457898",
                    CompanyRegNo= "J25/1254/2000",
                    Address = "bRASOV"
                },
                new Customer
                {
                    Name = "Anghel Dumitra",
                    Code = "2800701432518",
                    CompanyRegNo= "-",
                    Address = "Constanta"
                },
                new Customer
                {
                    Name = "Gheorghe Dumitru",
                    Code = "1781102362548",
                    CompanyRegNo= "-",
                    Address = "Iasi"
                },
                new Customer
                {
                    Name = "EXPORT IMPORT SRL",
                    Code = "RO14584487",
                    CompanyRegNo= "J30/251/1999",
                    Address = "Suceava"
                },

            };

            await context.customers.AddRangeAsync(customers);
            await context.SaveChangesAsync();
        }

        public static async Task SeedProducts(DataContext context)
        {
            if (context.products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Vopsea SAVANA 5L",
                    UM = "buc"
                },
                new Product
                {
                    Name = "Ciment 10kg",
                    UM = "sac"
                },
                new Product
                {
                    Name = "Grund MARO",
                    UM = "buc"
                },
                new Product
                {
                    Name = "Vopsea SVANA 1.5L",
                    UM = "buc"
                },
                new Product
                {
                    Name = "Cuie",
                    UM = "kg"
                },
                new Product
                {
                    Name = "Holsuruburi",
                    UM = "kg"
                },
                new Product
                {
                    Name = "PArchet",
                    UM = "cutie"
                },
            };

            await context.products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}