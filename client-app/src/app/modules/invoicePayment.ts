export interface InvoicePayment {

    id: string,
    paymentDate: Date | null,
    paymentType: string,
    ammountPaid: number,
    invoiceId: string
}