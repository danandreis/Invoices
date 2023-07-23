using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class NewCustomer
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

            DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                _context.customers.Add(request.customer);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Error when creating the customer! ");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}