using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Payment
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Guid id { get; set; }
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

                var paymentDB = await _context.invoicePayments.FindAsync(request.id);

                if (paymentDB == null) return null;

                _context.invoicePayments.Remove(paymentDB);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Error on registering the new payment !");

                return Result<Unit>.Success(Unit.Value);


            }
        }
    }
}