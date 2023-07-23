using Application.Core;
using Domain;
using MediatR;
using Persistence;


namespace Application.Invoices
{
    public class Add
    {
        public class Command : IRequest<Result<Guid>>
        {

            public Invoice invoice { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Guid>>
        {

            public DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {

                _context.invoices.Add(request.invoice);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Guid>.Failure("Eroare on adding the invoice");

                return Result<Guid>.Success(request.invoice.Id);

            }
        }
    }
}