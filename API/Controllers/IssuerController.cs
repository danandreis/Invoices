using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.InvoiceIssuer;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{

    public class IssuerController : BaseApiController
    {

        [HttpGet] //api/issuer/
        public async Task<ActionResult<List<Issuer>>> GetIssuer(Guid id)
        {

            var result = await Mediator.Send(new Details.Query { });

            return HandleResult(result);

        }

        [HttpPost] //adauga issuer - api/issuer
        public async Task<ActionResult> AddIssuer(Issuer newIssuer)
        {

            return HandleResult(await Mediator.Send(new Add.Command { issuer = newIssuer }));

        }

        [HttpPut("{id}")] //actualizare issuer - api/issuer/:id
        public async Task<ActionResult> UpdateIssuer(Guid id, Issuer issuer)
        {

            issuer.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command { issuer = issuer }));
        }

        [HttpDelete("{id}")] //stergere issuer - api/issuer/:id
        public async Task<ActionResult> DeleteIssuer(Guid id)
        {


            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}