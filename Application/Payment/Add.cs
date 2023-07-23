using Application.Core;
using Domain;
using MediatR;
using Persistence;


namespace Application.Payment
{
    public class Add
    {
        public class Command : IRequest<Result<Unit>>
        {

            public InvoicePayment payment { get; set; }

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

                _context.invoicePayments.Add(request.payment);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Error on registering the new payment");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}