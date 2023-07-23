using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.InvoiceIssuer
{
    public class Details
    {
        public class Query : IRequest<Result<List<Issuer>>>
        { }

        public class Handler : IRequestHandler<Query, Result<List<Issuer>>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<List<Issuer>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var emitent = await _context.Issuers.ToListAsync();

                return Result<List<Issuer>>.Success(emitent);

            }
        }
    }
}