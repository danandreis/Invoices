import { Grid } from "semantic-ui-react";
import PaymentsList from "./PaymentsList";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import PaymentForm from "../form/PaymentForm";


export default observer(function InvoicesPaymentDashBoard() {

    const { paymentStore, invoiceDetailsStore } = useStore();
    const { openForm } = paymentStore

    const { currentInvoiceDetails } = invoiceDetailsStore

    if (currentInvoiceDetails === undefined) return <LoadingComponents content="Loading data..." />

    return (
        <Grid>
            <Grid.Column width={10}>

                <PaymentsList />

            </Grid.Column>

            <Grid.Column width={6}>

                {openForm &&
                    <PaymentForm />
                }
            </Grid.Column>
        </Grid >
    )

})