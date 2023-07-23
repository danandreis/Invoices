using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Customer> customers { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<InvoiceSeries> invoiceSeries { get; set; }
        public DbSet<Invoice> invoices { get; set; }
        public DbSet<Issuer> Issuers { get; set; }
        public DbSet<ProductsInvoices> productsInvoices { get; set; }
        public DbSet<InvoicePayment> invoicePayments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<ProductsInvoices>().HasKey(pf => new
            {

                pf.invoiceId,
                pf.productId

            });

            modelBuilder.Entity<ProductsInvoices>().HasOne(p => p.product).WithMany(pf => pf.productsInvoices).
                HasForeignKey(pf => pf.productId);

            modelBuilder.Entity<ProductsInvoices>().HasOne(f => f.invoice).WithMany(pf => pf.productsInvoices).
                HasForeignKey(pf => pf.invoiceId);

            base.OnModelCreating(modelBuilder);

        }

    }
}