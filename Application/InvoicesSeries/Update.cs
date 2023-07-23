using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.InvoicesSeries
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {

            public InvoiceSeries invoiceSeries { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {

                _context = context;
                _mapper = mapper;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var seriesDB = await _context.invoiceSeries.FindAsync(request.invoiceSeries.Id);

                if (seriesDB == null) return null;

                _mapper.Map(request.invoiceSeries, seriesDB);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {

                    return Result<Unit>.Failure("Error on updating the invoice series!");
                }

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}