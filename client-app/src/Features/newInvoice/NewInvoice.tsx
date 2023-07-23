import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import Etape from "./etape/Etape";
import CustomerDashboard from "../customers/dashboard/CustomerDashboard";
import ProductsDashboard from "../products/dashboard/ProductsDashboard";
import Invoice from "../invoiceSite/Invoice";

export default observer(function NewInvoice() {

    const { processStepStore, invoiceStore, customerStore } = useStore();
    const { processStep, changeProcessStep } = processStepStore;

    const { newInvoice, setInvoice, resetInvoiceInfo, invoiceCustomer } = invoiceStore
    const { deleteSelectedCustomer } = customerStore

    useEffect(() => {

        if (window.location.pathname !== '/editInvoice') {
            setInvoice(true);
            resetInvoiceInfo();
            deleteSelectedCustomer();
            changeProcessStep(1)

        }

    }, [newInvoice])

    return (

        <Grid>
            <Grid.Column>
                <Segment>
                    <Etape />
                </Segment>
                <Segment>
                    {(processStep === 1) &&
                        < CustomerDashboard />
                    }
                    {(processStep === 2) &&
                        < ProductsDashboard />
                    }
                    {(processStep === 3) &&
                        < Invoice />
                    }
                </Segment>
            </Grid.Column>
        </Grid>


    )
})