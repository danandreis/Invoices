using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Customers
{
    public class List
    {

        public class Query : IRequest<Result<List<Customer>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Customer>>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<List<Customer>>> Handle(Query request, CancellationToken cancellationToken)
            {

                return Result<List<Customer>>.Success(await _context.customers.ToListAsync());

            }
        }

    }
}