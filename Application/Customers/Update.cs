using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Update
    {



        public class Command : IRequest<Result<Unit>>
        {

            public Customer customer { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {


            public CommandValidator()
            {


                RuleFor(x => x.customer).SetValidator(new CustomerValidator());

            }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var client = await _context.customers.FindAsync(request.customer.Id);

                if (client == null) return null;

                _mapper.Map(request.customer, client);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Error when updating the customer data!");

                return Result<Unit>.Success(Unit.Value);

            }
        }


    }
}