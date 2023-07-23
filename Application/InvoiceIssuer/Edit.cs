using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.InvoiceIssuer
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Issuer issuer { get; set; }
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

                var issuer = await _context.Issuers.FindAsync(request.issuer.Id);

                if (issuer == null) return null;

                _mapper.Map(request.issuer, issuer);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {

                    return Result<Unit>.Failure("Error on updating the data!");

                }

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}