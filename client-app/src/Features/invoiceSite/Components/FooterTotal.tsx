import React from "react";
import { Table } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

export default function FooterTotal() {

    const { invoiceStore } = useStore();
    const { calculusTotalPriceWithoutVAT, calculusInvoiceVAT, calculusInvoiceTotalAmmount } = invoiceStore;

    return (

        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan="5" textAlign="center" style={{ backgroundColor: 'white' }}>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                    {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 }).format(calculusTotalPriceWithoutVAT())}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                    {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 }).format(calculusInvoiceVAT())}
                </Table.HeaderCell>
            </Table.Row>
            <Table.Row >
                <Table.HeaderCell colSpan="5" textAlign="center" >
                    TOTAL :
                </Table.HeaderCell>
                <Table.HeaderCell colSpan="2" textAlign="center" style={{ backgroundColor: '#DFDEE5' }}>
                    {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 }).format(calculusInvoiceTotalAmmount())}
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    )
}