using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Payment
{
    public class Details
    {
        public class Query : IRequest<Result<InvoicePayment>>
        {

            public Guid id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<InvoicePayment>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<InvoicePayment>> Handle(Query request, CancellationToken cancellationToken)
            {

                var payment = await _context.invoicePayments.FindAsync(request.id);

                if (payment == null) return Result<InvoicePayment>.Failure("Error on reading the data ");

                return Result<InvoicePayment>.Success(payment);

            }
        }

    }
}