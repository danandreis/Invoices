import { Document, Page, PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Popup, Table } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import { SyntheticEvent, useEffect, useState } from "react";
import ProductTable from "../../invoicePDF/Components/ProductTable";
import InvoiceHeader from "../../invoicePDF/Components/InvoiceHeader";

export default observer(function List() {

    const [target, setTarget] = useState('');
    const [idSelectedInvoice, setIdSelectedInvoice] = useState('')

    const { invoiceDetailsStore, customerStore, issuerStore, invoiceStore, paymentStore } = useStore();
    const { invoiceList, loadInvoiceDetails, loadingInfo, intiailizeInvoiceDetails } = invoiceDetailsStore;

    const { loadCustomer, selectCustomer, deleteSelectedCustomer } = customerStore;
    const { loadIssuer } = issuerStore;

    const { addCustomer, addIssuer, setactiveSeries, setProductsList, setQuantitiesList,
        setInvoice, initializeListOfProductsAndQuantities, setIssueDate } = invoiceStore;

    const { setOpenForm } = paymentStore

    const navigate = useNavigate();

    useEffect(() => {

        intiailizeInvoiceDetails()
        deleteSelectedCustomer()

    }, [deleteSelectedCustomer, intiailizeInvoiceDetails])

    function loadCurrentInvoiceDetails(id: string) {

        loadInvoiceDetails(id).then((currentInvoice) => {

            loadCustomer(currentInvoice?.customer.id!).then((customer) => addCustomer(customer!));
            loadIssuer().then((issuer) => { addIssuer(issuer!) });
            setIssueDate(currentInvoice?.issueDate!.toString()!);

            initializeListOfProductsAndQuantities();

            currentInvoice?.productsInvoices.forEach((element) => {

                setProductsList(element.product);
                setQuantitiesList(element.product.id, element.quantity);

            })

            var series = {
                allocationDate: new Date(),
                series: currentInvoice!.series,
                currentNo: currentInvoice!.number,
                id: '',
                startNo: 0,
                endNo: 0,
                active: 1

            };

            setactiveSeries(series);
            setInvoice(false);

        });

    }

    function editInvoice(id: string) {

        loadCurrentInvoiceDetails(id);
        navigate('/editInvoice')
    }

    function loadCurrentInvoice(e: SyntheticEvent<HTMLButtonElement>, id: string) {

        setTarget(e.currentTarget.name);
        setIdSelectedInvoice(id);
        loadCurrentInvoiceDetails(id);

    }

    function displayPayments(id: string) {

        loadCurrentInvoiceDetails(id);
        setOpenForm(false);
        navigate(`/payments/${id}`)

    }

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

    const FacturaPDF = () => (<Document>

        <Page size="A4" style={styles.page}>
            <InvoiceHeader />
            <ProductTable />
        </Page>
    </Document>)

    return (

        <Table.Body>
            {invoiceList!.map((currentInvoice) => (

                <Table.Row
                    key={currentInvoice.id} textAlign='center'
                // {...currentInvoice.sumaAchitata === 0 ? {error :true} : {error : false}}
                >
                    <Table.Cell>{invoiceList.indexOf(currentInvoice) + 1}</Table.Cell>
                    <Table.Cell>{currentInvoice.series}{' '}{currentInvoice.number}</Table.Cell>
                    <Table.Cell>{format(new Date(currentInvoice.issueDate), "dd.MM.yyyy")}</Table.Cell>
                    <Table.Cell>{currentInvoice.issuer.name}</Table.Cell>
                    <Table.Cell>{currentInvoice.customer.name}</Table.Cell>
                    <Table.Cell>
                        {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                            .format(currentInvoice.invoiceAmmount)}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                        {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                            .format(currentInvoice.invoiceAmmount - (currentInvoice.invoiceAmmount / 1.19))}
                    </Table.Cell>
                    <Table.Cell>{currentInvoice.paid ?
                        <Icon name="check" color="green" /> :
                        <Icon name="warning circle" color="red" />}
                    </Table.Cell>
                    <Table.Cell>
                        <Popup
                            content='Edit currentInvoice'
                            trigger={
                                <Button
                                    onClick={() => editInvoice(currentInvoice.id)}
                                    style={{ padding: '0px', width: '35px', height: '35px' }}
                                    color="blue"
                                    icon='edit'>
                                </Button>
                            }
                        />

                        {selectCustomer === undefined ||
                            (selectCustomer !== undefined && idSelectedInvoice !== currentInvoice.id) ?
                            <Popup
                                content='View PDF currentInvoice'
                                trigger={
                                    <Button
                                        name={currentInvoice.id}
                                        style={{ color: 'red', padding: '0px', width: '35px', height: '35px' }}
                                        icon='file'
                                        loading={loadingInfo && target === currentInvoice.id}
                                        onClick={(e) => loadCurrentInvoice(e, currentInvoice.id)}>
                                    </Button>
                                }
                            />
                            :
                            <PDFDownloadLink document={<FacturaPDF />}
                                fileName="Invoice.pdf"
                                style={{ color: 'red', width: '50px', height: '50px' }}>
                                <Icon name="file pdf" size="big" />
                            </PDFDownloadLink>
                        }
                        <Popup
                            content='Payments'
                            trigger={
                                <Button
                                    color="green"
                                    style={{ padding: '0px', width: '35px', height: '35px' }}
                                    icon='money'
                                    onClick={() => displayPayments(currentInvoice.id)}>
                                </Button>
                            }
                        />
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    )
})

