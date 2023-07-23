using Application.Core;
using Domain;
using MediatR;
using Persistence;


namespace Application.ProductInvoicesList
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {

            public ProductsInvoices[] productsList { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            public readonly DataContext _context;

            public Handler(DataContext context)
            {


                _context = context;


            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                foreach (var prod in request.productsList)
                {

                    var p = new ProductsInvoices
                    {

                        productId = prod.productId,
                        Quantity = prod.Quantity,
                        invoiceId = prod.invoiceId

                    };

                    await _context.productsInvoices.AddAsync(p);

                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Error on adding the products in database!");

                return Result<Unit>.Success(Unit.Value);

            }

        }
    }
}