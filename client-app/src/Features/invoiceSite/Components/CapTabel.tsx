import React from "react";
import { Table } from "semantic-ui-react";

export default function TableHead() {


    return (

        <Table.Header>
            <Table.Row textAlign='center'>
                <Table.HeaderCell width={1}>Index</Table.HeaderCell>
                <Table.HeaderCell width={7}>Description</Table.HeaderCell>
                <Table.HeaderCell width={2}>U.M.</Table.HeaderCell>
                <Table.HeaderCell width={2}>Price<br />(without VAT)</Table.HeaderCell>
                <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                <Table.HeaderCell width={2}> Total Price</Table.HeaderCell>
                <Table.HeaderCell width={2}>VAT</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}