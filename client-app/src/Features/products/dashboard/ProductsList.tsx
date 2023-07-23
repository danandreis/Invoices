import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/store/store'

export default observer(function ProductList() {

    const [target, setTarget] = useState('');
    const { productsStore } = useStore();
    const { loadingDelete, deleteProduct, selectProduct } = productsStore;

    const { invoiceStore } = useStore();
    const { setProductsList, setQuantitiesList, getProductQuantity } = invoiceStore;

    function handleDeleteProduct(e: SyntheticEvent<HTMLButtonElement>, id: string) {

        setTarget(e.currentTarget.name);
        deleteProduct(id).then(() => window.location.reload());

    }

    function handleSelectProduct(id: string) {

        var product = selectProduct(id);
        setProductsList(product!);

        if (getProductQuantity(id) === undefined)
            setQuantitiesList(product?.id!, 1);

    }



    return (

        <Fragment>
            <Header size='large' style={{ textAlign: 'center' }}>Lista Produse</Header>

            <Segment>
                <Item.Group divided>
                    {productsStore.productsListByName.map(product => (

                        <Item key={product.id}>
                            <Item.Content>

                                <Item.Header>{product.name}</Item.Header>

                                <Item.Meta>
                                    <Label>U.M.</Label>
                                    {product.um}
                                </Item.Meta>

                                <Item.Meta>
                                    <Label>Pret</Label>
                                    {Number(product.price).toFixed(2) + " LEI"}
                                </Item.Meta>

                                <Item.Meta>
                                    <Label>Descriere</Label>
                                    {product.description}
                                </Item.Meta>

                                <Item.Extra>
                                    {(window.location.pathname === '/products') &&
                                        <Fragment>
                                            <Button
                                                name={product.id}
                                                loading={loadingDelete && target === product.id}
                                                onClick={(e) => handleDeleteProduct(e, product.id)}
                                                floated='right'
                                                content='Delete'
                                                color='red' />
                                            <Button
                                                as={Link} to={`/products/${product.id}`}
                                                floated='right'
                                                content='Edit'
                                                color='blue' />
                                        </Fragment>
                                    }
                                    {((window.location.pathname === '/editInvoice')
                                        ||
                                        (window.location.pathname === '/newInvoice')) &&
                                        <Button
                                            floated='right'
                                            content='Select'
                                            color='green'
                                            onClick={() => handleSelectProduct(product.id)}

                                        />
                                    }
                                </Item.Extra>

                            </Item.Content>

                        </Item>

                    ))

                    }
                </Item.Group>

            </Segment>

        </Fragment>


    )
})