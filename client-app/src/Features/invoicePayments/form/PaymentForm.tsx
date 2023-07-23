import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Header, Label, Segment } from "semantic-ui-react";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { CategoryOptions } from "../../../app/common/options/category";
import { useStore } from "../../../app/store/store";
import { InvoicePayment } from "../../../app/modules/invoicePayment";
import { v4 as uuid } from 'uuid'

export default function PaymentForm() {

    const [editForm, setEditForm] = useState(false)

    const [remainingPayment, setRemainingPayment] = useState(0); //restul de plata din factura selectata

    const { paymentStore, invoiceDetailsStore, invoiceStore } = useStore();
    const { setOpenForm, registerNewPayment, updatePayment, loadingPayments, payment } = paymentStore

    const { currentInvoiceDetails, addNewPayment, updateInvoicePaymentStatus, setTotalPayments, totalPayments, setPaidAmmount, deleteInvoicePayment } = invoiceDetailsStore

    const { issueDate } = invoiceStore

    const [paymentDataForm, setPaymentDataForm] = useState<InvoicePayment>({

        id: "",
        paymentDate: new Date(),
        paymentType: '',
        ammountPaid: 0,
        invoiceId: ''
    });

    const validateForm = Yup.object({

        paymentDate: Yup.date().required('Payment date is mandatory'),
        paymentType: Yup.string().required('Select a payment type'),
        ammountPaid: Yup.number()
            .min(1, 'Enter a value > 0')
            .max(remainingPayment, `The ammount can not be grater than the rest of payment of : ${remainingPayment}`)
            .required('Enetr a valid ammount!'),

    });

    useEffect(() => {

        if (payment !== undefined && payment!.id !== "") {

            setPaymentDataForm(payment);
            setEditForm(true);

            if (editForm) {

                setRemainingPayment((currentInvoiceDetails!.invoiceAmmount - totalPayments) + Number(payment.ammountPaid))
            }

        }
        else {

            setRemainingPayment(currentInvoiceDetails!.invoiceAmmount - totalPayments)

        }

    }, [setPaymentDataForm, editForm])


    function cancelPaymentRegistration() {

        setOpenForm(false)

    }

    function handleSubmitForm(newPayment: InvoicePayment) {

        if (payment!.id === '') {

            newPayment.id = uuid();
            newPayment.invoiceId = currentInvoiceDetails!.id;

            registerNewPayment(newPayment).then(() => {

                setOpenForm(false);

                addNewPayment(newPayment);

                setTotalPayments(currentInvoiceDetails?.invoicePayments!);

                if (totalPayments + Number(newPayment.ammountPaid) === currentInvoiceDetails!.invoiceAmmount) {

                    updateInvoicePaymentStatus(currentInvoiceDetails?.id!, 1)
                    setPaidAmmount(1);

                }
            })

        }
        else {

            updatePayment(newPayment).then(() => {

                setOpenForm(false);

                deleteInvoicePayment(payment!.id);

                addNewPayment(newPayment);

                setTotalPayments(currentInvoiceDetails!.invoicePayments);

                if (totalPayments - Number(payment!.ammountPaid) + Number(newPayment.ammountPaid) === currentInvoiceDetails!.invoiceAmmount) {

                    updateInvoicePaymentStatus(currentInvoiceDetails?.id!, 1)
                    setPaidAmmount(1);

                }
                else {

                    updateInvoicePaymentStatus(currentInvoiceDetails?.id!, 0)
                    setPaidAmmount(0);

                }

            })

        }

    }

    return (

        <Segment clearing>
            <Header color="teal" content="Register payment" />

            <Formik
                initialValues={paymentDataForm}
                enableReinitialize
                onSubmit={(newPayment) => handleSubmitForm(newPayment)}
                validationSchema={validateForm}
            >
                {({ handleSubmit, isValid, dirty, isSubmitting }) => (

                    <Form className='ui form' onSubmit={handleSubmit}>
                        <MyTextInput placeholder={"Ammount paid"} name="ammountPaid" label="Ammount :" />
                        <Label content='Date of payment :' basic style={{ border: 'none', padding: '0px' }} />
                        <MyDateInput
                            placeholderText="Date"
                            name="paymentDate"
                            dateFormat='dd.MM.yyyy'
                            minDate={new Date(issueDate) || null}
                            maxDate={new Date()}
                        />
                        <MySelectInput placeholder={"Select the payment type"} name="paymentType"
                            options={CategoryOptions} label="Payment type" />
                        <Button
                            positive
                            type="submit"
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loadingPayments}
                            content='Save'
                        />
                        <Button
                            negative
                            type="submit"
                            content='Cancel'
                            onClick={() => cancelPaymentRegistration()}
                        />
                    </Form>
                )}

            </Formik>
        </Segment>

    )
}