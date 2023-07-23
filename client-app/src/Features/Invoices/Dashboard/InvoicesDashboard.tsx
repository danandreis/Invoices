import { Grid, Header, Segment } from "semantic-ui-react";
import SearchInvoice from "./SearchInvoice";
import InvoicesList from "./InvoicesList";

export default function InvoicesDashboard() {

    return (

        <Grid>
            <Grid.Column width={16}>

                <Header content="List of issued invoices" textAlign="center"></Header>

                <Segment>

                    <InvoicesList />

                </Segment>

            </Grid.Column>
        </Grid>


    )
}