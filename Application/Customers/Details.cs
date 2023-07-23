using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Details
    {

        public class Query : IRequest<Result<Customer>>
        {

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<Customer>>
        {
            public DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<Customer>> Handle(Query request, CancellationToken cancellationToken)
            {

                var customer = await _context.customers.FindAsync(request.Id);

                return Result<Customer>.Success(customer);

            }
        }


    }
}