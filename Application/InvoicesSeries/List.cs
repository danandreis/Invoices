using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.InvoicesSeries
{
    public class List
    {
        public class Query : IRequest<Result<List<InvoiceSeries>>> { }

        public class Handler : IRequestHandler<Query, Result<List<InvoiceSeries>>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<List<InvoiceSeries>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var result = await _context.invoiceSeries.ToListAsync();

                return Result<List<InvoiceSeries>>.Success(result);

            }
        }

    }
}