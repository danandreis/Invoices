import { makeAutoObservable } from "mobx";
import { InvoicePayment } from "../modules/invoicePayment";
import agent from "../api/agent";

export default class PaymentStore {

    payment: InvoicePayment | undefined;
    loadingPayments = false;
    openForm = false;

    constructor() {

        this.payment = {

            id: '',
            paymentDate: new Date(),
            paymentType: '',
            ammountPaid: 0,
            invoiceId: ''
        }

        makeAutoObservable(this);
    }


    loadPaymentDetail = async (id: string) => {

        this.loadingPayments = true;
        try {

            var plataDB = await agent.Payments.details(id);
            Object.assign(this.payment!, plataDB);

            this.payment!.paymentDate = new Date(plataDB.paymentDate!);

            this.setLoadingPayments(false);

            return this.payment;

        } catch (error) {

            console.log(error);
            this.setLoadingPayments(false);
        }

    }

    initializePaymentDetails = () => {

        this.payment = {

            id: '',
            paymentDate: null,
            paymentType: '',
            ammountPaid: 0,
            invoiceId: ''
        };

        return this.payment;
    }

    registerNewPayment = async (payment: InvoicePayment) => {

        this.loadingPayments = true;

        try {

            await agent.Payments.add(payment);

            this.setLoadingPayments(false);

        } catch (error) {

            console.log(error);

            this.setLoadingPayments(false);

        }

    }

    updatePayment = async (payment: InvoicePayment) => {

        this.loadingPayments = true;

        try {

            await agent.Payments.update(payment);

            this.setLoadingPayments(false);

        } catch (error) {

            console.log(error);
            this.setLoadingPayments(false);
        }
    }

    deletePayment = async (id: string) => {

        this.loadingPayments = true;

        try {

            await agent.Payments.delete(id);

            this.setLoadingPayments(false)

        } catch (error) {

            console.log(error);
            this.setLoadingPayments(false);

        }
    }

    setLoadingPayments = (state: boolean) => {
        this.loadingPayments = state;
    }

    // setfacturaPLati = (fact: FacturaDetaliata) => {
    //     this.facturaPlati = fact;
    // }

    setOpenForm = (stare: boolean) => {

        this.openForm = stare;
    }

}