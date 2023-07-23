import { Table } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

export default function ProductsLIst() {

    const { invoiceStore } = useStore()
    const { productsList, getProductQuantity } = invoiceStore

    return (
        <Table.Body>
            {Array.from(productsList.values()).map((product) => (

                <Table.Row key={product.id}>
                    <Table.Cell>
                        {Array.from(productsList.values()).indexOf(product) + 1}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        <b>{product.name}</b> <br />
                        <i>{product.description}</i>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        {product.um}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                        {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                            .format(Math.trunc((product.price / 1.19) * 100) / 100)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        {getProductQuantity(product.id)}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                        {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                            .format(getProductQuantity(product.id)! * Math.trunc((product.price / 1.19) * 100) / 100)}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                        {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                            .format(getProductQuantity(product.id)! * (product.price - (Math.trunc((product.price / 1.19) * 100) / 100)))}
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>

    )
}