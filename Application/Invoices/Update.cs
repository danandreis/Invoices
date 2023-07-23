using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Invoices
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Invoice invoice { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            public DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;

                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var invoiceDB = await _context.invoices.FindAsync(request.invoice.Id);

                if (invoiceDB == null)
                    return null;

                _mapper.Map(request.invoice, invoiceDB);

                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}