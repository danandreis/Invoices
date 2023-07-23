import { createContext, useContext } from "react";
import Customer from "./customerSore";
import commonStore from "./commonStore";
import InvoiceDetailsStore from "./invoiceDetailsStore";
import IssuerStore from "./issuerStore";
import InvoiceStore from "./invoiceStore";
import ProcessSteptStore from "./processStep";
import ProductStore from "./productStore";
import SeriesStore from "./seriesStore";
import PaymenStore from "./paymentStore";

interface Store {

    customerStore: Customer;
    productsStore: ProductStore;
    commonStore: commonStore;
    issuerStore: IssuerStore;
    seriesStore: SeriesStore;
    invoiceStore: InvoiceStore;
    processStepStore: ProcessSteptStore;
    invoiceDetailsStore: InvoiceDetailsStore;
    paymentStore: PaymenStore;

}

export const store: Store = {
    customerStore: new Customer(),
    productsStore: new ProductStore(),
    commonStore: new commonStore(),
    issuerStore: new IssuerStore(),
    seriesStore: new SeriesStore(),
    invoiceStore: new InvoiceStore(),
    processStepStore: new ProcessSteptStore(),
    invoiceDetailsStore: new InvoiceDetailsStore(),
    paymentStore: new PaymenStore()
}

export const StoreContext = createContext(store);

export function useStore() {

    return useContext(StoreContext);
}