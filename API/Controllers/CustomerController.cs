using Application.Customers;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomerController : BaseApiController
    {
        [HttpGet] //api/clienti
        public async Task<ActionResult<List<Customer>>> GetCustomerList()
        {

            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/clienti/id
        public async Task<IActionResult> GetCustomer(Guid id)
        {

            var result = await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);

        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer(Customer customer)
        {

            return HandleResult(await Mediator.Send(new NewCustomer.Command { customer = customer }));

        }

        [HttpPut("{id}")] //api/clienti/id
        public async Task<IActionResult> UpdateCustomer(Guid id, Customer customer)
        {

            customer.Id = id;

            return HandleResult(await Mediator.Send(new Update.Command { customer = customer }));

        }

        [HttpDelete("{id}")]  //api/clienti/id
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));

        }
    }
}