import { Document, Page, PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";
import { Card, Grid, Icon, Item, Label } from "semantic-ui-react";
import HeaderFactura from "../../invoicePDF/Components/InvoiceHeader";
import TabelaProduse from "../../invoicePDF/Components/ProductTable";
import Client from "./Headers/Customer";
import Furnizor from "./Headers/Issuer";
import SerieFactura from "./Headers/InvoiceSeries";

export default function Header() {

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
            <HeaderFactura />
            <TabelaProduse />
        </Page>
    </Document>)

    return (

        <Grid columns={3} verticalAlign='middle'>

            <Furnizor />

            {/* <Grid.Column width={6}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            FURNIZOR :
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Description>
                                        <Label>Denumire</Label>
                                        <span style={{ fontWeight: 'bold' }}>IMPORT EXPORT COMPUTING SRL</span>
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Adresa</Label>
                                        Bucuresti
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>CUI</Label>
                                        RO12323232
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Numar Reg. Com.</Label>
                                        J40/1254/2012
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Banca</Label>
                                        RaiffeisenBank SA
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>IBAN</Label>
                                        RO12RZBR1254796500125478
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Card.Content>
                </Card>
            </Grid.Column> */}

            <Grid.Column width={4} key="2">
                <Card fluid>
                    <SerieFactura />
                    {/* <Card.Content>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Description>
                                        <Label>Serie</Label>
                                        ABC
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Numar</Label>
                                        121232
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Data</Label>
                                        05.03.2023
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Card.Content> */}
                    <Card.Content textAlign="center">
                        <Icon name='file pdf' color="red"></Icon>
                        <PDFDownloadLink document={<FacturaPDF />} fileName='Factura.pdf' style={{ color: 'blue' }}>
                            Descarca Factura PDF
                        </PDFDownloadLink>
                    </Card.Content>
                </Card>
            </Grid.Column>

            <Client />

            {/* <Grid.Column width={6} key="3">
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            CLIENT :
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Description>
                                        <Label>Denumire</Label>
                                        <span style={{ fontWeight: 'bold' }}>BUSINESS CONSULT SRL</span>
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Adresa</Label>
                                        Craiova
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>CUI</Label>
                                        RO123232
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Numar Reg. Com.</Label>
                                        J21/1100/2000
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>Banca</Label>
                                        RaiffeisenBank SA
                                    </Item.Description>
                                    <Item.Description>
                                        <Label>IBAN</Label>
                                        RO12RZBR45878541202150001
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Card.Content>
                </Card>
            </Grid.Column> */}
        </Grid>


    )


} 
