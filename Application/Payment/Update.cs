using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Payment
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {

            public InvoicePayment payment { get; set; }

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

                var paymentDB = await _context.invoicePayments.FindAsync(request.payment.Id);

                _mapper.Map(request.payment, paymentDB);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Error on updating the payment");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}