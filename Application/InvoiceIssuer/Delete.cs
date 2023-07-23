using Application.Core;
using MediatR;
using Persistence;

namespace Application.InvoiceIssuer
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

                var issuerDB = await _context.Issuers.FindAsync(request.Id);

                if (issuerDB == null) return null;

                _context.Issuers.Remove(issuerDB);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {

                    return Result<Unit>.Failure("Error on deleting the invocie issuer infos");
                }

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}