using Application.Core;
using Application.InvoiceIssuer;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Invoices
{
    public class Details
    {
        public class Query : IRequest<Result<InvoiceDTO>>
        {

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<InvoiceDTO>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {

                _context = context;
                _mapper = mapper;

            }

            public async Task<Result<InvoiceDTO>> Handle(Query request, CancellationToken cancellationToken)
            {

                var invoiceDetails = await _context.invoices.Include(f => f.customer).Include(f => f.issuer)
                                .Include(f => f.invoicePayments).Include(f => f.productsInvoices)
                                .ThenInclude(pf => pf.product)
                               .FirstAsync(f => f.Id == request.Id);

                var baseDetails = _mapper.Map<InvoiceDTO>(invoiceDetails);

                return Result<InvoiceDTO>.Success(baseDetails);

            }
        }

    }
}