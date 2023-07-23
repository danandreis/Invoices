using Application.Payment;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class PaymentsController : BaseApiController
    {
        [HttpGet("{id}")] //load current invoice payments
        public async Task<IActionResult> GetPayments(Guid Id)
        {

            return HandleResult(await Mediator.Send(new Details.Query { id = Id }));

        }

        [HttpPost]
        public async Task<IActionResult> AddPayment(InvoicePayment payment)
        {

            return HandleResult(await Mediator.Send(new Add.Command { payment = payment }));

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(Guid id, InvoicePayment paymentFactura)
        {
            paymentFactura.Id = id;

            return HandleResult(await Mediator.Send(new Update.Command { payment = paymentFactura }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(Guid Id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { id = Id }));
        }
    }
}