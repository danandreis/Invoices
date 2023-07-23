using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet] //api/produse
        public async Task<ActionResult<List<Product>>> GetProducts()
        {

            return await Mediator.Send(new List.Query());

        }

        [HttpGet("{id}")] //api/produse/{id}
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {

            return await Mediator.Send(new Details.Query { Id = id });

        }

        [HttpPost] //api/Produse - adaugare product
        public async Task<IActionResult> AddProduct(Product product)
        {

            return Ok(await Mediator.Send(new Add.Command { product = product }));

        }

        [HttpPut("{id}")] //actualizare product api/produse/{id}
        public async Task<IActionResult> UpdateProduct(Guid Id, Product product)
        {

            product.Id = Id;

            return Ok(await Mediator.Send(new Update.Command { product = product }));

        }

        [HttpDelete("{id}")] //sterge product
        public async Task<IActionResult> DeleteProduct(Guid id)
        {

            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}