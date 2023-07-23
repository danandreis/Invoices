using Application.Core;
using Domain;
using MediatR;
using Persistence;
namespace Application.InvoicesSeries
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {

            public InvoiceSeries invoiceSeries { get; set; }

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

                _context.invoiceSeries.Add(request.invoiceSeries);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {

                    return Result<Unit>.Failure("Error on invoices series allocation ");
                }

                return Result<Unit>.Success(Unit.Value);


            }
        }
    }
}