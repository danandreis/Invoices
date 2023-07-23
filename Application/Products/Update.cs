using AutoMapper;
using Domain;
using MediatR;
using Persistence;


namespace Application.Products
{
    public class Update
    {
        public class Command : IRequest
        {

            public Product product { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {

                _context = context;
                _mapper = mapper;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var productDB = await _context.products.FindAsync(request.product.Id);

                _mapper.Map(request.product, productDB);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}