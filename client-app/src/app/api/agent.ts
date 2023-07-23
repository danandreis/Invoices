import axios, { AxiosError, AxiosResponse } from "axios";
import { Customer } from "../modules/customer";
import { Product } from "../modules/product";
import { toast } from 'react-toastify'
import { router } from "../router/Routes";
import { store } from "../store/store";
import { Issuer as IssuerDB } from "../modules/issuer";
import { DetailedInvoice } from "../modules/detailedInvoice";
import { InvoicePayment } from "../modules/invoicePayment";
import { Invoice } from "../modules/invoice";
import { ProductsInvoice } from "../modules/productsInvoice";
import { invoiceSeries } from "../modules/invoiceSeries";
import { InvoicesProductsDB } from "../modules/InvoicesProductsDB";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {

    await sleep(1000);
    return response;

}, (error: AxiosError) => {

    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
        case 400:

            if (config.method === 'get' && data.errors.hasOwnProperty("{id}")) {

                router.navigate('/not-found');

            }

            if (data.errors) {

                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {

                        modalStateErrors.push(data.errors[key]);

                    }
                }

                throw modalStateErrors.flat();
            }
            else {

                toast.error(data);

            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
        default:
            break;
    }

    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Customers = {

    list: () => requests.get<Customer[]>('/customer'),
    details: (id: string) => requests.get<Customer>(`/customer/${id}`),
    add: (client: Customer) => requests.post<void>('/customer', client),
    update: (client: Customer) => requests.put<void>(`/customer/${client.id}`, client),
    delete: (id: string) => requests.delete<void>(`/customer/${id}`)

}

const Products = {

    list: () => requests.get<Product[]>('/products'),
    details: (id: string) => requests.get<Product>(`/products/${id}`),
    add: (product: Product) => requests.post<void>('/products', product),
    update: (product: Product) => requests.put<void>(`/products/${product.id}`, product),
    delete: (id: string) => requests.delete<void>(`/products/${id}`)

}

const issuerDB = {

    details: () => requests.get<IssuerDB[]>('/issuer'),
    add: (issuer: IssuerDB) => requests.post<void>('/issuer', issuer),
    update: (issuer: IssuerDB) => requests.put<void>(`/issuer/${issuer.id}`, issuer),
    delete: (id: string) => requests.delete<void>(`issuer/${id}`)

}

const Series = {

    list: () => requests.get<invoiceSeries[]>('/series'),
    add: (newSeries: invoiceSeries) => requests.post<void>('/series', newSeries),
    update: (newSeries: invoiceSeries) => requests.put<void>(`/series/${newSeries.id}`, newSeries),
    activeSeries: () => requests.get<invoiceSeries>('/series/activa')

}

const invoicesProducts = {

    add: (products: InvoicesProductsDB[]) => requests.post<void>('/invoicesProducts', products),
    delete: (id: string) => requests.delete<void>(`/invoicesProducts/${id}`)


}

const Invoices = {

    list: () => requests.get<DetailedInvoice[]>('/invoices'),
    details: (id: string) => requests.get<DetailedInvoice>(`/invoices/${id}`),
    update: (invoice: Invoice) => requests.put<void>(`/invoices/${invoice.id}`, invoice),
    updateInvoicePaymentStatus: (id: string, status: number) => requests.put<void>(`/invoices/updateInvoicePaymentStatus/${id}/${status}`, {}),
    add: (invoice: Invoice) => requests.post<string>('/invoices', invoice)


}

const Payments = {

    add: (payment: InvoicePayment) => requests.post<void>('/payments', payment),
    details: (id: string) => requests.get<InvoicePayment>(`/payments/${id}`),
    update: (payment: InvoicePayment) => requests.put<void>(`/payments/${payment.id}`, payment),
    delete: (id: string) => requests.delete<void>(`/payments/${id}`)

}

const agent = {

    Customers,
    Products,
    issuerDB,
    Series,
    invoicesProducts,
    Invoices,
    Payments
}

export default agent;