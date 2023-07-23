import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Customer } from "../modules/customer";
import { Issuer } from "../modules/issuer";
import { Invoice } from "../modules/invoice";
import { Product } from "../modules/product";
import { InvoicesProductsDB } from "../modules/InvoicesProductsDB";
import { invoiceSeries } from "../modules/invoiceSeries";

export default class InvoiceStore {

    invoiceCustomer: Customer
    invoiceIssuer: Issuer
    issueDate = ''
    productsList = new Map<string, Product>(); //cheie = idProduct, valoare=Product
    quantitiesList = new Map<string, number>(); //cheie = idProduct, valoare = quantity
    activeSeries: invoiceSeries | undefined
    totalPriceWithoutVAT: number = 0;
    invoiceVAT: number = 0;
    invoiceTotalPrice: number = 0;
    invoiceTotalAmmount: number = 0;
    invoiceProducts: InvoicesProductsDB | undefined; //element folosit pentru inregistrara in BD a Productelor din invoice
    products: Array<InvoicesProductsDB> = new Array();
    productsIDs: Array<string> = new Array();
    newInvoice = true;
    loadingSave = false;

    constructor() {

        this.invoiceCustomer = {
            id: '',
            name: '',
            code: '',
            companyRegNo: '-',
            address: '',
            bank: '-',
            iban: '-',
            type: 1

        };

        this.invoiceIssuer = {
            id: '',
            name: '',
            code: '',
            companyRegNo: '-',
            address: '',
            bank: '-',
            iban: '-'

        };

        this.activeSeries = {
            id: '',
            allocationDate: null,
            series: '',
            startNo: 0,
            endNo: 0,
            currentNo: 0,
            active: 1

        };

        this.invoiceProducts = {

            productId: '',
            Quantity: 0,
            invoiceId: ''
        };

        makeAutoObservable(this)

    }

    addCustomer = (newCustomer: Customer) => {

        Object.assign(this.invoiceCustomer!, newCustomer);

        return this.invoiceCustomer;

    }

    addIssuer = (issuer: Issuer) => {
        Object.assign(this.invoiceIssuer, issuer);
        return this.invoiceIssuer;
    }

    setProductsList = (Product: Product) => {

        if (!this.productsList.has(Product.id))
            this.productsList.set(Product.id, Product);

        return this.productsList;

    }


    setQuantitiesList = (idProduct: string, quantity: number) => {

        this.quantitiesList.set(idProduct, quantity);
        return this.quantitiesList
            ;

    }

    getProductQuantity = (id: string) => {

        return this.quantitiesList.get(id);
    }

    deleteProductFromList = (id: string) => {

        this.productsList.delete(id);
        this.quantitiesList.delete(id);

        return this.productsList;

    }

    get invoiceDate() {

        return new Date();
    }

    setactiveSeries = (newSeries: invoiceSeries) => {

        Object.assign(this.activeSeries!, newSeries);
        return this.activeSeries;

    }

    get invoiceSeries() {

        return this.activeSeries;
    }


    calculusTotalPriceWithoutVAT = () => {


        this.totalPriceWithoutVAT = 0

        this.productsList.forEach((Product) => (

            this.totalPriceWithoutVAT = this.totalPriceWithoutVAT + (this.getProductQuantity(Product.id)! * Math.trunc((Product.price / 1.19) * 100) / 100)
        ))

        return Number(this.totalPriceWithoutVAT);

    }

    calculusInvoiceVAT = () => {

        this.invoiceVAT = 0;

        this.productsList.forEach((Product) => (

            this.invoiceVAT = this.invoiceVAT + (this.getProductQuantity(Product.id)! * (Product.price - (Math.trunc((Product.price / 1.19) * 100) / 100))))
        )

        return Number(this.invoiceVAT);

    }

    calculusInvoiceTotalAmmount = () => {

        this.invoiceTotalAmmount = 0;

        this.productsList.forEach((Product) => (

            this.invoiceTotalAmmount = this.invoiceTotalAmmount + (this.getProductQuantity(Product.id)! * Product.price)

        ))

        return Number(this.invoiceTotalAmmount);

    }

    //Salvare informatii invoice in baa de date
    saveInvoiceToDB = async (invoice: Invoice) => {

        this.loadingSave = true;
        try {

            //1. Actualizez numarul curent al facturii
            this.activeSeries!.currentNo++
            await agent.Series.update(this.activeSeries!);

            //2. Adauga invoice in baza de date

            var IdInvoice = await agent.Invoices.add(invoice);

            //3. Adaug Productele aferente facturii
            this.products = new Array();
            this.productsList.forEach((Product) => {

                this.invoiceProducts!.productId = Product.id;
                this.invoiceProducts!.Quantity = this.getProductQuantity(Product.id)!;
                this.invoiceProducts!.invoiceId = IdInvoice;

                this.products.push(this.invoiceProducts!);

                this.invoiceProducts = {

                    productId: '',
                    Quantity: 0,
                    invoiceId: ''
                };

            })

            await agent.invoicesProducts.add(this.products)

            this.setLoadingSave(false)

        } catch (error) {

            console.log(error);
            this.setLoadingSave(false)

        }

    }

    //Salvare informatii invoice in baa de date
    updateInvoiceDataToDB = async (invoice: Invoice) => {

        this.loadingSave = true;
        try {

            //2. update invoide data in DB
            await agent.Invoices.update(invoice);

            //3. Update invoice products in DB
            //Delete the existing products
            await agent.invoicesProducts.delete(invoice.id);

            //Add new products
            this.products = new Array();
            this.productsList.forEach((Product) => {

                this.invoiceProducts!.productId = Product.id;
                this.invoiceProducts!.Quantity = this.getProductQuantity(Product.id)!;
                this.invoiceProducts!.invoiceId = invoice.id;

                this.products.push(this.invoiceProducts!);

                this.invoiceProducts = {

                    productId: '',
                    Quantity: 0,
                    invoiceId: ''
                };

            })

            await agent.invoicesProducts.add(this.products)

            this.setLoadingSave(false)

        } catch (error) {

            console.log(error);
            this.setLoadingSave(false)

        }

    }

    setLoadingSave = (status: boolean) => {
        this.loadingSave = status;
    }

    setInvoice = (status: boolean) => {

        this.newInvoice = status;
    }

    resetInvoiceInfo = () => {

        this.productsList.clear();
        this.quantitiesList
            .clear();
        this.invoiceCustomer = {
            id: '',
            name: '',
            code: '',
            companyRegNo: '-',
            address: '',
            bank: '-',
            iban: '-',
            type: 1

        };
    }

    initializeListOfProductsAndQuantities = () => {
        this.productsList.clear();
        this.quantitiesList
            .clear();
    }

    setIssueDate = (newDate: string) => {

        this.issueDate = newDate;
    }



}