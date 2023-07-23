import { observer } from 'mobx-react-lite';
import { Fragment, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';

export default observer(function CustomerList() {

    const [target, setTarget] = useState('');
    const { customerStore } = useStore();
    const { deleteCustomer, loadingDelete, loadCustomer } = customerStore;

    const { invoiceStore, invoiceDetailsStore } = useStore();
    const { addCustomer, invoiceCustomer } = invoiceStore;
    const { currentInvoiceDetails } = invoiceDetailsStore;

    function handleClientDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {

        setTarget(e.currentTarget.name);
        deleteCustomer(id).then(() => window. location. reload());
    }

    function handleSelectieCLient(id: string) {

        loadCustomer(id).then((customer) => {

            addCustomer(customer!)

            if (currentInvoiceDetails?.customer !== undefined)
                Object.assign(currentInvoiceDetails.customer, customer)
        });

    }

    return (

        <Fragment>
            <Header size='large' style={{ textAlign: 'center' }}>Lista clienti</Header>

            <Segment>

                <Item.Group divided>
                    {customerStore.CustomerByName.map(customer => (

                        <Item key={customer.id}>
                            <Item.Content>
                                <Item.Header as="a"> {customer.name} </Item.Header>
                                <Item.Meta>
                                    <Label>Code : </Label>
                                    {customer.code}
                                </Item.Meta>
                                <Item.Meta>
                                    {customer.companyRegNo !== '-' &&
                                        <Label>Nr. Reg. Com : </Label>}
                                    {(customer.companyRegNo !== '-') ? customer.companyRegNo : ""}
                                </Item.Meta>
                                <Item.Meta>
                                    {customer.iban !== '-' &&
                                        <Label>iban : </Label>}
                                    {(customer.iban !== '-') ? customer.iban : ""}
                                </Item.Meta>
                                <Item.Meta>
                                    {customer.bank !== '-' &&
                                        <Label>Bank : </Label>}
                                    {(customer.bank !== '-') ? customer.bank : ""}
                                </Item.Meta>
                                <Item.Description>
                                    <Label>Address : </Label>
                                    {customer.address}
                                </Item.Description>
                                <Item.Extra>
                                    {(window.location.pathname === '/customer') &&
                                        <Fragment>
                                            < Button
                                                name={customer.id}
                                                loading={loadingDelete && target === customer.id}
                                                onClick={(e) => handleClientDelete(e, customer.id)}
                                                floated='right'
                                                content='Delete'
                                                color='red' />

                                            <Button
                                                as={Link} to={`/customer/${customer.id}`}
                                                floated='right'
                                                content='Edit'
                                                color='blue'
                                            />
                                        </Fragment>
                                    }

                                    {((window.location.pathname === '/editInvoice')
                                        ||
                                        (window.location.pathname === '/newInvoice')) && (customer.id !== invoiceCustomer.id) &&
                                        <Button
                                            floated='right'
                                            content='Select'
                                            color='green'
                                            onClick={() => handleSelectieCLient(customer.id)}
                                        />
                                    }
                                </Item.Extra>
                            </Item.Content>
                        </Item>

                    ))}
                </Item.Group>
            </Segment>
        </Fragment >

    )
})