using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.ProductInvoicesList;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{

    public class InvoicesProductsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> AddProctusToInvoices(ProductsInvoices[] products)
        {

            return Ok(await Mediator.Send(new Add.Command { productsList = products }));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductFromInvoice(Guid id)
        {

            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}