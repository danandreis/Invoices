import { observer } from "mobx-react-lite";
import { Card, Grid, Item, Label } from "semantic-ui-react";
import { useStore } from "../../../../app/store/store";

export default observer(function Issuer() {

    const { invoiceStore } = useStore()
    const { invoiceIssuer } = invoiceStore

    return (

        <Grid.Column width={6}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        ISSUER :
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Description>
                                    <Label>Name</Label>
                                    <span style={{ fontWeight: 'bold' }}>{invoiceIssuer.name}</span>
                                </Item.Description>
                                <Item.Description>
                                    <Label>Address</Label>
                                    {invoiceIssuer.address}
                                </Item.Description>
                                <Item.Description>
                                    <Label>Code</Label>
                                    {invoiceIssuer.code}
                                </Item.Description>
                                <Item.Description>
                                    <Label>Company Register No.</Label>
                                    {invoiceIssuer.companyRegNo}
                                </Item.Description>
                                <Item.Description>
                                    <Label>Bank</Label>
                                    {invoiceIssuer.bank}
                                </Item.Description>
                                <Item.Description>
                                    <Label>IBAN</Label>
                                    {invoiceIssuer.iban}
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
})
