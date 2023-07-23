import { Page, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'
//import ReactPDF from '@react-pdf/renderer'
import TabelaProduse from './Components/ProductTable'
import HeaderFactura from './Components/InvoiceHeader'
import { Segment } from 'semantic-ui-react'

export default function FacturaPDF() {

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

    const Factura = () => (

        <Document>

            <Page size="A4" style={styles.page}>
                <HeaderFactura />
                <TabelaProduse />
            </Page>
        </Document>
    )

    return (

        <Segment>
            <PDFDownloadLink document={<Factura />} fileName='invoice.pdf' style={{ color: 'green' }}>Invoice</PDFDownloadLink>
        </Segment>


    )


}