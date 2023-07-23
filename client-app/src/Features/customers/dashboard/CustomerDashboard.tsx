import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Icon, Input, Label, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/store/store';
import CustomerList from './CustomerList';

export default observer(function CustomerDashboard() {

    const { customerStore } = useStore();
    const { loadCustomers, customersRegistry, searchCustomer } = customerStore;
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [isSearching, setIsSeaching] = useState(false);


    useEffect(() => {

        loadCustomers();
        handleChangeInput('');
        setIsSeaching(false);

    }, [loadCustomers]);

    useEffect(() => {

        setLoadingSearch(isSearching);

    }, [isSearching]);


    function handleChangeInput(nume: string) {

        setIsSeaching(true);

        setTimeout(() => {

            setIsSeaching(false);

        }, 1000);

        searchCustomer(nume);

    }

    if (customerStore.loadingInitial) return <LoadingComponents content='Loading clients...' />

    return (

        <Grid>

            <Grid.Column width='10'>

                <CustomerList />

            </Grid.Column>
            <Grid.Column width='6' style={{ marginTop: '3em' }}>

                <Segment style={{ height: '500px' }} >
                    {(window.location.pathname !== '/newInvoice') &&
                        <Button Button as={Link} to='/addCustomer/1' positive icon labelPosition='left'>
                            <Icon name='plus circle'></Icon>
                            New Customer
                        </Button>
                    }

                    <Segment>
                        <Label content='Search customer'></Label>
                        <Input
                            placeholder='Enter text to search...'
                            onChange={(e) => handleChangeInput(e.target.value)}
                            icon='search'
                            loading={loadingSearch}
                        />
                    </Segment>



                </Segment>

            </Grid.Column>

        </Grid >

    )
})