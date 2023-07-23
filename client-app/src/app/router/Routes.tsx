import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../Features/error/NotFound";
import ServerError from "../../Features/error/ServerError";
import InvoicesDashboard from "../../Features/Invoices/Dashboard/InvoicesDashboard";
import App from "../layout/App";
import CustomerDashboard from "../../Features/customers/dashboard/CustomerDashboard";
import CustomerForm from "../../Features/customers/Form/CustomerForm";
import ProductsDashboard from "../../Features/products/dashboard/ProductsDashboard";
import ProductForm from "../../Features/products/form/ProductForm";
import IssuerDashboard from "../../Features/issuer/dashboard/IssuerDashboard";
import IssuerForm from "../../Features/issuer/Form/EmitentForm/IssuerForm";
import SeriesDashboard from "../../Features/series/dashboard/SeriesDashboard";
import SeriesForm from "../../Features/series/form/SeriesForm";
import InvoicePaymentDashboar from "../../Features/invoicePayments/dashboard/InvoicePaymentDashboar";
import NewInvoice from "../../Features/newInvoice/NewInvoice";

export const routes: RouteObject[] = [

    {

        path: '/',
        element: <App />,
        children: [

            { path: 'customer', element: <CustomerDashboard /> },
            { path: 'customer/:id', element: <CustomerForm /> },
            { path: 'addcustomer/:tipClient', element: <CustomerForm /> },
            { path: 'products', element: <ProductsDashboard /> },
            { path: 'products/:id', element: <ProductForm /> },
            { path: 'addProduct', element: <ProductForm /> },
            { path: 'issuer', element: <IssuerDashboard /> },
            { path: 'addIssuer', element: <IssuerForm /> },
            { path: 'issuer/:id', element: <IssuerForm /> },
            { path: 'series', element: <SeriesDashboard /> },
            { path: 'addSeries', element: <SeriesForm /> },
            { path: 'editSeries/:id', element: <SeriesForm /> },
            { path: 'newInvoice', element: <NewInvoice key='new' /> },
            { path: 'editInvoice', element: <NewInvoice key='edit' /> },
            { path: 'invoicesList', element: <InvoicesDashboard /> },
            { path: 'payments/:id', element: <InvoicePaymentDashboar /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]

    }

]

export const router = createBrowserRouter(routes);