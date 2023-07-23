import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Customer } from '../../../app/modules/customer';
import { useStore } from '../../../app/store/store';
import { v4 as uuid } from 'uuid'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput';
import { router } from '../../../app/router/Routes';

export default observer(function CustomerForm() {

    const [customer, setClient] = useState<Customer>({

        id: '',
        name: '',
        code: '',
        companyRegNo: '-',
        address: '',
        bank: '-',
        iban: '-',
        type: 1

    });
    const { customerStore } = useStore()
    const { addCustomer, updateCustomerData, loadingEdit, loadCustomer, loadingInitial } = customerStore;
    const { id, customerType } = useParams();
    const navigate = useNavigate();



    const validationSchema = Yup.object({

        type: Yup.string().required(),
        name: Yup.string()
            .when('type', (type) =>

                (Number(type) === 0) ?
                    Yup.string()
                        .matches(/^[A-Z][a-z]{2,}([ ][A-Z][a-z]{2,})+$/, "Numele nu este valid")
                        .required('The name is mandatory')
                    :
                    Yup.string().required('The name is mandatory'),
            ),

        code: Yup.string().required('The code is mandatory (CNP - private person / CUI - companies)'),
        companyRegNo: Yup.string().required('The Registry company code is mandatory'),
        bank: Yup.string().required('The bank is mandatory'),
        iban: Yup.string().required('The IBAN account is mandatory'),
        address: Yup.string().required('The address is mandatory'),

    });

    useEffect(() => {

        if (id) loadCustomer(id).then(customer => {

            setClient(customer!);

        })

    }, [id, loadCustomer]);


    /* useEffect(() => {
  
      alert(customer.name);
  
  }, [customer.name])*/

    function handleFormSubmit(customer: Customer) {

        // if (customerType !== undefined)
        //     customer.type = Number(customerType)

        if (!customer.id) {

            customer.id = uuid();

            customer.companyRegNo = (customer.companyRegNo === '') ? '-' : customer.companyRegNo;
            customer.iban = (customer.iban === '') ? '-' : customer.iban;
            customer.bank = (customer.bank === '') ? '-' : customer.bank;

            addCustomer(customer).then(() => navigate('/customer'));
        }
        else {

            updateCustomerData(customer).then(() => navigate('/customer'));
        }

    }

    function handleCustomerChange(customerType: number) {

        if (customerType !== undefined)
            customer.type = Number(customerType)

        router.navigate(`/addCustomer/${customerType}`);

    }

    console.log(customerType);
    console.log(customer.type);


    if (loadingInitial) return <LoadingComponents content='Load customer...' />

    return (

        <Segment clearing >
            <Header content='Customer form' color='teal' style={{ textAlign: 'center', fontSize: '21px' }} />

            {!id &&
                <div style={{ textAlign: 'center', padding: '7px' }}>
                    <Button.Group>
                        <Button onClick={() => handleCustomerChange(1)} >Company</Button>
                        <Button onClick={() => handleCustomerChange(0)} positive>Private</Button>
                    </Button.Group>
                </div>
            }

            <Formik
                enableReinitialize
                initialValues={customer}
                onSubmit={values => handleFormSubmit(values)}
                validationSchema={validationSchema}>

                {({ handleSubmit, isValid, isSubmitting, dirty }) => (

                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='name' label='Name' />
                        <MyTextInput placeholder='CUI' name='code' label='Code' />

                        {(customer.type === 1 && (customerType === undefined || customerType === '1')) &&
                            <Fragment>
                                <MyTextInput placeholder='Company Registry Number' name='companyRegNo' label='Company Registry Number' />
                                <MyTextInput placeholder='IBAN' name='iban' label='IBAN' />
                                <MyTextInput placeholder='Bank' name='bank' label='Bank' />
                            </Fragment>
                        }

                        <MyTextInput placeholder='Address' name='address' label='Address' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loadingEdit} floated='right' positive type='submit'
                            content={id ? 'Update' : 'Save'} />
                        <Button as={Link} to='/customer' floated='right' negative type='button' content='Cancel' />

                    </Form>
                )}
            </Formik>

        </Segment >

    )
})