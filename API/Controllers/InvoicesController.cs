using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Invoices;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{

    public class InvoicesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetInvoicesList()
        {

            return HandleResult(await Mediator.Send(new List.Query { }));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoiceDetails(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));

        }

        [HttpPost]
        public async Task<IActionResult> AddInvoice(Invoice invoice)
        {


            return HandleResult(await Mediator.Send(new Add.Command { invoice = invoice }));

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvocie(Guid id, Invoice invoice)
        {

            invoice.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { invoice = invoice }));

        }

        [HttpPut("updateInvoicePaymentStatus/{id}/{status}")]
        public async Task<IActionResult> UpdatePaymentStatus(Guid id, int status)
        {

            return HandleResult(await Mediator.Send(new PaymentStatus.Command { id = id, status = status }));
        }
    }
}