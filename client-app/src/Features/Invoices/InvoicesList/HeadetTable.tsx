import { Table } from "semantic-ui-react";

export default function HeaderTabel() {


    return (

        <Table.Header>
            <Table.Row textAlign="center">
                <Table.HeaderCell width={1}>Indx</Table.HeaderCell>
                <Table.HeaderCell>Invoice</Table.HeaderCell>
                <Table.HeaderCell width={1}>Date</Table.HeaderCell>
                <Table.HeaderCell width={3}>Issuer</Table.HeaderCell>
                <Table.HeaderCell width={3}>Customer</Table.HeaderCell>
                <Table.HeaderCell width={2}>Total</Table.HeaderCell>
                <Table.HeaderCell width={1}>VAT</Table.HeaderCell>
                <Table.HeaderCell width={2}>Paid</Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

    )
}