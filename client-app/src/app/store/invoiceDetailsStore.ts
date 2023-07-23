import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { DetailedInvoice } from "../modules/detailedInvoice";
import { InvoicePayment } from "../modules/invoicePayment";

export default class InvoiceDetailsStore {

    invoiceList: DetailedInvoice[] = new Array();
    currentInvoiceDetails: DetailedInvoice | undefined;
    detailedInvoicesRegistry = new Map<string, DetailedInvoice>();
    totalPayments = 0; //total plati din factua selectata
    loadingInfo = false;

    constructor() {

        makeAutoObservable(this)
    }

    loadInvoiceList = async () => {

        this.loadingInfo = true;

        try {

            this.invoiceList = await agent.Invoices.list();

            this.setLoadingInfo(false);

            return this.invoiceList;


        } catch (error) {

            console.log(error);
            this.setLoadingInfo(false);

        }
    }

    loadInvoiceDetails = async (id: string) => {

        this.setLoadingInfo(true);

        try {

            var details = await agent.Invoices.details(id);

            this.setInvoiceDetails(details);

            this.setLoadingInfo(false);
            
            return this.currentInvoiceDetails;

        } catch (error) {

            console.log(error);
            this.setLoadingInfo(true);

        }


    }

    updateInvoicePaymentStatus = async (id: string, status: number) => {

        try {

            await agent.Invoices.updateInvoicePaymentStatus(id, status);


        } catch (error) {

            console.log(error);

        }


    }

    //Sterge plata selectata din lista de palti aferentra facturii
    deleteInvoicePayment = (id: string) => {

        var paymentIndex = this.currentInvoiceDetails?.invoicePayments.findIndex(p => p.id === id);
        this.currentInvoiceDetails?.invoicePayments.splice(paymentIndex!, 1);

    }

    addNewPayment = (plata: InvoicePayment) => {
        this.currentInvoiceDetails?.invoicePayments.push(plata);

        this.setInvoiceDetails(this.orderPaymentsByDate(this.currentInvoiceDetails!));

    }

    setLoadingInfo = (state: boolean) => {

        this.loadingInfo = state;
    }

    orderPaymentsByDate = (invoiceDetails: DetailedInvoice) => {

        invoiceDetails.invoicePayments.sort((payment1, payment2) => {

            var date1 = new Date(payment1.paymentDate!);
            var date2 = new Date(payment2.paymentDate!);

            if (date1 > date2)
                return 1

            if (date1 < date2)
                return -1

            return 0;

        })

        return invoiceDetails;

    }

    setInvoiceDetails = (invoiceDetails: DetailedInvoice) => {


        this.currentInvoiceDetails = this.orderPaymentsByDate(invoiceDetails);

    }

    intiailizeInvoiceDetails = () => {

        this.currentInvoiceDetails = undefined

    }


    setTotalPayments = (paymentList: InvoicePayment[]) => {

        this.totalPayments = 0;

        if (paymentList.length > 0)
            paymentList.forEach((plata) => this.totalPayments = this.totalPayments + Number(plata.ammountPaid));

        return this.totalPayments;
    }

    setPaidAmmount = (status: number) => {

        this.currentInvoiceDetails!.paid = status;
        return this.currentInvoiceDetails?.paid;
    }
}