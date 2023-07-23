import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import { Card, Item, Label } from "semantic-ui-react";
import { useStore } from "../../../../app/store/store";

export default observer(function InvoiceSeries() {

    const { invoiceStore } = useStore();

    const { invoiceSeries, newInvoice, issueDate } = invoiceStore;


    return (

        <Card.Content>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Item.Description>
                            <Label>Series</Label>
                            {invoiceSeries?.series}
                        </Item.Description>
                        <Item.Description>
                            <Label>Number</Label>
                            {invoiceSeries?.currentNo?.toString()}
                        </Item.Description>
                        <Item.Description>
                            <Label>Date</Label>
                            {newInvoice === true ?
                                format(new Date(), "dd.MM.yyyy", { locale: ro }).toString()
                                :
                                format(new Date(issueDate)!, "dd.MM.yyyy", { locale: ro }).toString()}
                        </Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Card.Content>

    )

})
