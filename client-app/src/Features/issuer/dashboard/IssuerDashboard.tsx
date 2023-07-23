import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/store/store'

export default observer(function EmitentDashboard() {

    const { issuerStore } = useStore();
    const { LoadingInitial, loadingDelete, loadIssuer, deleteIssuer } = issuerStore;

    const [issuer, setIssuer] = useState({

        id: '',
        name: '',
        code: '',
        companyRegNo: '',
        address: '',
        bank: '',
        iban: '',


    });

    useEffect(() => {

        loadIssuer().then((e) => {

            if (e) setIssuer(e!);
        });

    }, [loadIssuer])

    if (LoadingInitial) return <LoadingComponents content={'Loading issuer data ...'} />


    function issuerDelete(id: string) {

        deleteIssuer(id).then(() => window.location.reload());
    }

    return (

        <Grid>
            <Grid.Column width='10'>
                <Segment clearing>
                    {!issuer.id ?
                        <Button
                            positive icon labelPosition='left'
                            as={Link} to={'/addIssuer'}>
                            <Icon name='plus circle'></Icon>
                            Adauga Firma
                        </Button>

                        :

                        <Item.Group>
                            <Header size='large' style={{ textAlign: 'center' }}>Company details</Header>

                            <Item key={issuer.id}>
                                <Item.Content>
                                    <Item.Header as={''}>{issuer.name}</Item.Header>
                                    <Item.Meta>
                                        <Label>Addres : </Label>
                                        {issuer.address}
                                    </Item.Meta>
                                    <Item.Meta>
                                        <Label>Code : </Label>
                                        {issuer.code}
                                    </Item.Meta>
                                    <Item.Meta>
                                        <Label>Company Registry No.: </Label>
                                        {issuer.companyRegNo}
                                    </Item.Meta>
                                    <Item.Meta>
                                        <Label>IBAN : </Label>
                                        {issuer.iban}
                                    </Item.Meta>
                                    <Item.Meta>
                                        <Label>Bank : </Label>
                                        {issuer.bank}
                                    </Item.Meta>
                                    <Item.Extra>
                                        <Button
                                            as={Link} to={`/issuer/${issuer.id}`}
                                            floated='right'
                                            positive
                                            content='Edit'
                                        />
                                        <Button
                                            type='submit'
                                            floated='right'
                                            negative
                                            content='Delete'
                                            loading={loadingDelete}
                                            onClick={() => issuerDelete(issuer.id)}
                                        />
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>}
                </Segment>
            </Grid.Column>
        </Grid>

    )
})