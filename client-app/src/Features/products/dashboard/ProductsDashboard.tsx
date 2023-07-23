import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Grid, Icon, Input, Label, Segment } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/store/store'
import SelectedProductsList from './SelectedProductsList';
import ProductsList from './ProductsList';

export default observer(function ProductsDashboard() {

    const { productsStore } = useStore();
    const { loadProducts, searchProducts } = productsStore;
    const [isSearching, setIsSearching] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    useEffect(() => {

        loadProducts();
        handleChangeInput('');
        setIsSearching(false);

    }, [loadProducts]);


    useEffect(() => {


        setLoadingSearch(isSearching);


    }, [isSearching]);

    function handleChangeInput(denumire: string) {

        setLoadingSearch(true);

        setTimeout(() => {

            setLoadingSearch(false);
        }, 1000);

        searchProducts(denumire);

    }

    if (productsStore.loadingInitial) return <LoadingComponents content='Loading products....' />

    return (

        <Grid>
            <Grid.Column width='8'>

                <ProductsList />

            </Grid.Column>
            <Grid.Column width='8' style={{ marginTop: '3em' }}>

                <Segment style={{ height: '500px' }}>
                    {(window.location.pathname === '/products') &&
                        <Button as={Link} to='/addProduct' positive icon labelPosition='left'>
                            <Icon name='plus circle'></Icon>
                            Produs nou
                        </Button>
                    }
                    <Segment>
                        <Label content='Search products'></Label>
                        <Input
                            placehorder='Enter text ...'
                            icon={'search'}
                            loading={loadingSearch}
                            onChange={(e) => handleChangeInput(e.target.value)}
                        ></Input>
                    </Segment>
                    {((window.location.pathname === '/editInvoice')
                        ||
                        (window.location.pathname === '/newInvoice')) &&

                        <SelectedProductsList />
                    }

                </Segment>
            </Grid.Column>
        </Grid>

    )
})