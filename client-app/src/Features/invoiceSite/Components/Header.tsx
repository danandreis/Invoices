import { Document, Page, PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";
import { observer } from "mobx-react-lite";
import { Fragment, useState } from "react";
import { Button, Card, Grid, Icon } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import InvoiceHeader from "../../invoicePDF/Components/InvoiceHeader";
import ProductsTable from "../../invoicePDF/Components/ProductTable";
import Customer from "./Headers/Customer";
import Issuer from "./Headers/Issuer";
import InvoiceSeries from "./Headers/InvoiceSeries";
import ModalFile from "./ModalFile";
import { v4 as uuid } from 'uuid'
import { Invoice } from "../../../app/modules/invoice";


export default observer(function Header() {

    const [modalState, setModalState] = useState(false)
    const [facturaNoua] = useState<Invoice>({

        id: '',
        series: '',
        number: 0,
        issueDate: null,
        customerID: '',
        issuerID: '',
        invoiceAmmount: 0,
        paid: 0

    })

    const { invoiceStore, invoiceDetailsStore } = useStore()
    const { saveInvoiceToDB, updateInvoiceDataToDB, activeSeries, invoiceCustomer, invoiceIssuer,
        calculusInvoiceTotalAmmount, loadingSave, newInvoice } = invoiceStore;

    const { currentInvoiceDetails } = invoiceDetailsStore

    const styles = StyleSheet.create({

        page: {

            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 10,
            paddingLeft: 30,
            paddingRight: 30,
            lineHeight: 1.5,
            flexDirection: 'column'
        },

    })

    function handleSalvareFactura() {

        if (newInvoice) {

            facturaNoua.id = uuid();
            facturaNoua.issueDate = new Date();
            facturaNoua.series = activeSeries!.series;
            facturaNoua.number = activeSeries!.currentNo;
            facturaNoua.customerID = invoiceCustomer!.id;
            facturaNoua.issuerID = invoiceIssuer!.id;
            facturaNoua.invoiceAmmount = calculusInvoiceTotalAmmount();

            saveInvoiceToDB(facturaNoua).then(() => setModalState(true));
        }
        else {

            facturaNoua.id = currentInvoiceDetails!.id;
            facturaNoua.issueDate = currentInvoiceDetails!.issueDate;
            facturaNoua.series = currentInvoiceDetails!.series;
            facturaNoua.number = currentInvoiceDetails!.number;
            facturaNoua.customerID = currentInvoiceDetails!.customer.id;
            facturaNoua.issuerID = currentInvoiceDetails!.issuer.id;
            facturaNoua.invoiceAmmount = calculusInvoiceTotalAmmount();

            updateInvoiceDataToDB(facturaNoua).then(() => setModalState(true));

        }
    }

    const FacturaPDF = () => (<Document>

        <Page size="A4" style={styles.page}>
            <InvoiceHeader />
            <ProductsTable />
        </Page>
    </Document>)


    return (

        <Fragment>

            {(modalState === true) ? <ModalFile /> : null}

            <Grid columns={3} verticalAlign='middle'>

                <Issuer />

                <Grid.Column width={4} key="2">
                    <Card fluid>

                        <InvoiceSeries />

                        <Card.Content textAlign="center">
                            <Icon name='file pdf' color="red"></Icon>
                            <PDFDownloadLink document={<FacturaPDF />}
                                fileName="Invoice.pdf"
                                style={{ color: 'blue' }}>
                                Download PDF invoice
                            </PDFDownloadLink>
                        </Card.Content>
                        <Card.Content textAlign="center">
                            <Button
                                loading={loadingSave}
                                type="submit"
                                positive
                                content='Save'
                                onClick={() => handleSalvareFactura()}
                            />
                        </Card.Content>
                    </Card>
                </Grid.Column>

                <Customer />

            </Grid >
        </Fragment>


    )

})
