using Application.Customers;
using Application.InvoiceIssuer;
using Application.Payment;
using Application.ProductInvoicesList;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {

            CreateMap<Customer, Customer>();
            CreateMap<Product, Product>();
            CreateMap<Issuer, Issuer>();
            CreateMap<InvoiceSeries, InvoiceSeries>();
            CreateMap<Invoice, Invoice>();
            CreateMap<InvoicePayment, InvoicePayment>();

            CreateMap<Invoice, InvoiceDTO>();
            CreateMap<Customer, CustomerDTO>();
            CreateMap<Issuer, IssuerDTO>();
            CreateMap<ProductsInvoices, ProductsInvoicesDTO>();
            CreateMap<Product, ProductDTO>();
            CreateMap<InvoicePayment, InvoicePaymentDTO>();

        }

    }
}