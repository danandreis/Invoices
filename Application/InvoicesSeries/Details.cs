using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.InvoicesSeries
{
    public class Details
    {
        //Get the information about the active series 

        public class Query : IRequest<Result<InvoiceSeries>>
        { }

        public class Handler : IRequestHandler<Query, Result<InvoiceSeries>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<InvoiceSeries>> Handle(Query request, CancellationToken cancellationToken)
            {

                var serie = await _context.invoiceSeries.FirstOrDefaultAsync(s => s.Active == 1);

                if (serie == null)
                    serie = new InvoiceSeries();

                return Result<InvoiceSeries>.Success(serie);

            }
        }
    }
}