import { Card, Grid, Item, Label } from "semantic-ui-react";
import { useStore } from "../../../../app/store/store";


export default function Customer() {

    const { invoiceStore } = useStore()
    const { invoiceCustomer } = invoiceStore

    return (
        <Grid.Column width={6} key="3">
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        CUSTOMER :
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Description>
                                    <Label>Name</Label>
                                    <span style={{ fontWeight: 'bold' }}>{invoiceCustomer.name}</span>
                                </Item.Description>
                                <Item.Description>
                                    <Label>Address</Label>
                                    {invoiceCustomer.address}
                                </Item.Description>
                                <Item.Description>
                                    <Label>Code</Label>
                                    {invoiceCustomer.code}
                                </Item.Description>
                                <Item.Description>
                                    <Label>Company Registry No.</Label>
                                    {invoiceCustomer.companyRegNo}
                                </Item.Description>
                                <Item.Description>
                                    <Label>Bank</Label>
                                    {invoiceCustomer.bank}
                                </Item.Description>
                                <Item.Description>
                                    <Label>IBAN</Label>
                                    {invoiceCustomer.iban}
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Card.Content>
            </Card>
        </Grid.Column>

    )

} 
