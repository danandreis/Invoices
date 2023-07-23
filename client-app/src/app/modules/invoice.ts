export interface Invoice {
    id: string;
    series: string;
    number: number;
    issueDate: Date | null;
    customerID: string;
    issuerID: string;
    invoiceAmmount: number;
    paid: number;

}