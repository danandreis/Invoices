using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class PaymentStatus
    {

        public class Command : IRequest<Result<Unit>>
        {

            public Guid id { get; set; }
            public int status { get; set; }

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

                var paymentStatus = new Invoice { Id = request.id, Paid = request.status };
                _context.Attach(paymentStatus);
                _context.Entry(paymentStatus).Property(f => f.Paid).IsModified = true;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Error on updating the payment status");

                return Result<Unit>.Success(Unit.Value);


            }
        }
    }
}