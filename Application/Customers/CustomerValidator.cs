using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Customers
{
    public class CustomerValidator : AbstractValidator<Customer>
    {

        public CustomerValidator()
        {

            RuleFor(x => x.Name).Matches("^[A-Z][a-z]{2,}([ ][A-Z][a-z]{2,})+$").
                When(x => x.Type == 0, ApplyConditionTo.CurrentValidator).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.Code).NotEmpty();
            RuleFor(x => x.CompanyRegNo).NotEmpty();
            RuleFor(x => x.IBAN).NotEmpty();
            RuleFor(x => x.Bank).NotEmpty();

        }

    }
}