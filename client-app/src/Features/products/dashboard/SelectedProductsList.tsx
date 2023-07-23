import { observer } from 'mobx-react-lite';
import { Button, Header, Input, Segment, Table } from 'semantic-ui-react'
import { useStore } from '../../../app/store/store';

export default observer(function SelectedProductsList() {

    const { invoiceStore } = useStore();
    const { productsList, getProductQuantity, deleteProductFromList, setQuantitiesList } = invoiceStore;

    function handleDeleteProductFromList(id: string) {

        deleteProductFromList(id);

    }

    function handleAddProductQuantity(id: string) {

        setQuantitiesList(id, getProductQuantity(id)! + 1);

    }

    function handleRemoveProductQuantity(id: string) {

        if (getProductQuantity(id)! > 1) {

            setQuantitiesList(id, getProductQuantity(id)! - 1);

        }
    }

    return (

        <Segment>
            <Header content='List of selected products' textAlign='center' color='teal'></Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell width={5} textAlign="center">Quantity</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Array.from(productsList.values()).map((product => (

                        <Table.Row key={product.id}>
                            <Table.Cell>
                                {product.name}
                                <Button
                                    icon='trash'
                                    size='tiny'
                                    floated='right'
                                    color='red'
                                    onClick={() => handleDeleteProductFromList(product.id)} />
                            </Table.Cell>
                            <Table.Cell textAlign="center">
                                <Button
                                    icon={"plus"}
                                    size='small'
                                    onClick={() => handleAddProductQuantity(product.id)}
                                />
                                <Input size='big' style={{ width: '35px', marginLeft: '5px' }}>
                                    {getProductQuantity(product.id)}
                                </Input>
                                <Button
                                    icon={"minus"}
                                    size='small'
                                    onClick={() => handleRemoveProductQuantity(product.id)}
                                />
                            </Table.Cell>
                        </Table.Row>

                    )))}
                </Table.Body>
            </Table>
        </Segment>
    )
})