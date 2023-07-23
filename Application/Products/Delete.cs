using MediatR;
using Persistence;


namespace Application.Products
{
    public class Delete
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var productDB = _context.products.FindAsync(request.Id);

                _context.products.Remove(productDB.Result);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}