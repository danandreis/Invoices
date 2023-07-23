import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup'
import MyTextInput from '../../../../app/common/form/MyTextInput';
import LoadingComponents from '../../../../app/layout/LoadingComponents';
import { Issuer } from '../../../../app/modules/issuer';
import { useStore } from '../../../../app/store/store'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite';


export default observer(function IssuerForm() {

    const { issuerStore } = useStore();
    const { addIssuer, updateIssuer, loadIssuer, loadingEdit, LoadingInitial } = issuerStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [issuer, setIssuer] = useState({

        id: '',
        name: '',
        code: '',
        companyRegNo: '',
        address: '',
        bank: '',
        iban: '',


    });

    const ValidationSchema = Yup.object({

        name: Yup.string().required('The name is mandatory'),
        code: Yup.string().required('The code is mandatory'),
        companyRegNo: Yup.string().required('The company registry number is mandatory'),
        address: Yup.string().required('The address is mandatory'),
        bank: Yup.string().required('The bank is mandatory'),
        iban: Yup.string().required('The IBAN is mandatory'),

    });

    useEffect(() => {

        if (id) loadIssuer().then((e) => {

            setIssuer(e!);
            console.log(e);

        })

    }, [id, loadIssuer])

    function handleOnSubmit(issuer: Issuer) {

        if (issuer.id) {

            updateIssuer(issuer).then(() => navigate('/issuer'));

        }
        else {

            issuer.id = uuid();
            addIssuer(issuer).then(() => navigate('/issuer'));

        }

    }

    if (LoadingInitial) return <LoadingComponents content={'Loading Issuer data ...'} />

    return (

        <Grid>
            <Grid.Column width={10}>

                <Segment clearing>
                    <Header content='Issuer form' color='teal' style={{ textAlign: 'center', fontSize: '21px' }} />

                    <Formik
                        initialValues={issuer}
                        enableReinitialize
                        onSubmit={values => handleOnSubmit(values)}
                        validationSchema={ValidationSchema}
                    >

                        {({ handleSubmit, isValid, dirty, isSubmitting }) => (

                            <Form className='ui form' onSubmit={handleSubmit} >

                                <MyTextInput placeholder='Name' name='name' label='Name' />
                                <MyTextInput placeholder='Adsress' name='address' label='Address' />
                                <MyTextInput placeholder='Code' name='code' label='Code' />
                                <MyTextInput placeholder='Numar Reg Com.' name='companyRegNo' label='company Registry Number' />
                                <MyTextInput placeholder='Bank account' name='iban' label='Bank Account' />
                                <MyTextInput placeholder='Bank' name='bank' label='Bank' />

                                <Button
                                    positive
                                    type='submit'
                                    floated='right'
                                    loading={loadingEdit}
                                    disabled={isSubmitting || !dirty || !isValid}
                                    content={!id ? 'Add' : 'Update'}
                                />

                                <Button negative as={Link} to='/issuer' floated='right' content='Cancel' />

                            </Form>

                        )}

                    </Formik>

                </Segment>

            </Grid.Column>
        </Grid >
    )
})