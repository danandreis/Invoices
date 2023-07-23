import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Button, Header, Popup, Segment, Table } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default observer(function PaymentsList() {

    const [target, setTarget] = useState('');

    const { paymentStore, invoiceDetailsStore } = useStore();
    const { setOpenForm, openForm, loadPaymentDetail, initializePaymentDetails, loadingPayments, deletePayment } = paymentStore

    const navigate = useNavigate();

    const { currentInvoiceDetails, setTotalPayments, totalPayments, deleteInvoicePayment, setPaidAmmount, updateInvoicePaymentStatus } = invoiceDetailsStore

    useEffect(() => {

        setTotalPayments(currentInvoiceDetails?.invoicePayments!)

    }, [currentInvoiceDetails])

    function activatePaymentForm() {

        initializePaymentDetails();
        setOpenForm(true);

    }

    function editPayment(e: SyntheticEvent<HTMLButtonElement>, id: string) {

        setTarget(e.currentTarget.name);

        loadPaymentDetail(id).then(() => {

            setOpenForm(true);

        });


    }

    function deleteOfPayment(e: SyntheticEvent<HTMLButtonElement>, id: string) {

        setTarget(e.currentTarget.name);

        deletePayment(id).then(() => {

            deleteInvoicePayment(id); //Delete payment from payments list 

            setTotalPayments(currentInvoiceDetails?.invoicePayments!); //supdate the payment total

            if (invoiceDetailsStore.setPaidAmmount!) {

                updateInvoicePaymentStatus(currentInvoiceDetails?.id!, 0)

                setPaidAmmount(0);
            }
        })
    }

    if (currentInvoiceDetails === undefined) return <LoadingComponents content="Loading unpaid invoices ..." />

    function displayInvoicesList() {

        navigate('/invoicesList')
    }

    return (

        <Segment clearing>

            <Header color='teal' content="Invoice payments" textAlign="center"></Header>

            <Table>
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell width={1}>Invoice</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Date</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Customer</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Total</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Paid</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row textAlign="center">

                        <Table.Cell>{currentInvoiceDetails.series + ' ' + currentInvoiceDetails.number}</Table.Cell>
                        <Table.Cell>{format(new Date(currentInvoiceDetails.issueDate!), "dd.MM.yyyy")}</Table.Cell>
                        <Table.Cell>{currentInvoiceDetails.customer.name}</Table.Cell>
                        <Table.Cell>
                            {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                                .format(currentInvoiceDetails.invoiceAmmount)} { }
                        </Table.Cell>
                        <Table.Cell>{totalPayments}</Table.Cell>

                    </Table.Row>

                </Table.Body>

            </Table>
            {!openForm && (currentInvoiceDetails.paid === 0) &&
                <Button
                    positive
                    type="submit"
                    content="New payment"
                    floated="right"
                    style={{ marginBottom: '10px' }}
                    onClick={() => activatePaymentForm()}
                />
            }
            <Button
                color="blue"
                type="submit"
                content='Back to the list'
                floated="right"
                style={{ marginBottom: '10px' }}
                onClick={() => displayInvoicesList()} //Afiseaza lista de facturi emise

            />

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Indx</Table.HeaderCell>
                        <Table.HeaderCell>Payment Date</Table.HeaderCell>
                        <Table.HeaderCell>Ammount</Table.HeaderCell>
                        <Table.HeaderCell>Payment Type</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Options</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {currentInvoiceDetails.invoicePayments !== undefined
                        && currentInvoiceDetails.invoicePayments.map((payment) => (

                            <Table.Row key={payment.id}>

                                <Table.Cell>{currentInvoiceDetails.invoicePayments.indexOf(payment) + 1}</Table.Cell>
                                <Table.Cell>{format(new Date(payment.paymentDate!), "dd.MM.yyyy")}</Table.Cell>
                                <Table.Cell>{payment.ammountPaid}</Table.Cell>
                                <Table.Cell>{payment.paymentType}</Table.Cell>
                                <Table.Cell>
                                    {!openForm &&
                                        <Fragment>
                                            <Popup
                                                content='Edit payment'
                                                trigger={
                                                    <Button
                                                        size="tiny"
                                                        icon='edit'
                                                        color='blue'
                                                        type="submit"
                                                        name={payment.id}
                                                        loading={loadingPayments && target === payment.id}
                                                        onClick={(e) => editPayment(e, payment.id)}
                                                    />}
                                            />
                                            <Popup
                                                content='Delete payment'
                                                trigger={
                                                    <Button
                                                        size="tiny"
                                                        icon='trash'
                                                        color='red'
                                                        type="submit"
                                                        onClick={(e) => deleteOfPayment(e, payment.id)}
                                                    />
                                                }
                                            />
                                        </Fragment>
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))}

                </Table.Body>
            </Table>
        </Segment>

    )
})

