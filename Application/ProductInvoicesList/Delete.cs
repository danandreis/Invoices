using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProductInvoicesList
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var productsInvoicesDB = await _context.productsInvoices.Where(l => l.invoiceId == request.Id)
                                            .ToListAsync();

                if (productsInvoicesDB == null) return null;

                _context.productsInvoices.RemoveRange(productsInvoicesDB);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Error on deleting the products");

                return Result<Unit>.Success(Unit.Value);


            }
        }
    }
}