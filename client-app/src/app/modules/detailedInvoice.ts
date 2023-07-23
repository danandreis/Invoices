
import { Customer } from "./customer";
import { Issuer } from "./issuer";
import { InvoicePayment } from "./invoicePayment";
import { ProductsInvoice } from "./productsInvoice";

export interface DetailedInvoice {

    id: string,
    series: string,
    number: number,
    issueDate: Date,
    customer: Customer,
    issuer: Issuer,
    invoiceAmmount: number,
    paid: number,
    productsInvoices: ProductsInvoice[],
    invoicePayments: InvoicePayment[]

}