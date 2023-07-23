using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.InvoicesSeries;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class SeriesController : BaseApiController
    {
        [HttpGet] //api/series
        public async Task<ActionResult<List<InvoiceSeries>>> GetSeries()
        {

            return HandleResult(await Mediator.Send(new List.Query { }));

        }

        [HttpGet("{active}")] //api/series/active
        public async Task<ActionResult<InvoiceSeries>> GetActiveSeries()
        {

            return HandleResult(await Mediator.Send(new Details.Query { }));
        }

        [HttpPut("{id}")] //api/serii/:id -actualizare
        public async Task<ActionResult> UpdateSeries(Guid id, InvoiceSeries newInvoiceSeries)
        {

            newInvoiceSeries.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { invoiceSeries = newInvoiceSeries }));

        }

        [HttpPost] //api/serii - adaugare
        public async Task<ActionResult> AddSeries(InvoiceSeries newInvoiceSeries)
        {

            return HandleResult(await Mediator.Send(new Add.Command { invoiceSeries = newInvoiceSeries }));
        }
    }
}