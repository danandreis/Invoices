using Application.Core;
using Application.InvoiceIssuer;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Invoices
{
    public class List
    {
        public class Query : IRequest<Result<List<InvoiceDTO>>> { }

        public class Handler : IRequestHandler<Query, Result<List<InvoiceDTO>>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;

                _context = context;

            }

            public async Task<Result<List<InvoiceDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var invoiceDetails = await _context.invoices.Include(f => f.customer).Include(f => f.issuer)
                  .ToListAsync();

                var baseDetails = _mapper.Map<List<InvoiceDTO>>(invoiceDetails);

                return Result<List<InvoiceDTO>>.Success(baseDetails);

            }
        }
    }
}