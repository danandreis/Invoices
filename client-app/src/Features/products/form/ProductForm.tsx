import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { Product } from '../../../app/modules/product';
import { useStore } from '../../../app/store/store'
import { v4 as uuid } from 'uuid'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup'
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function ProductForm() {

    const { productsStore } = useStore();
    const { loadingEdit, loadingInitial, updateProduct, addProduct, loadProduct } = productsStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({

        id: '',
        name: '',
        um: '',
        price: 0.0,
        description: ''
    });

    const ValidationRules = Yup.object({

        name: Yup.string().required("Name is mandatory"),
        um: Yup.string().required("Measure Unit is mandatory"),
        price: Yup.number().required("Price is mandatory.").min(0.10, "price must be greater than 0")

    })

    useEffect(() => {

        if (id) loadProduct(id).then(product => {

            setProduct(product!);
        })

    }, [id, loadProduct]);

    function handleSubmit(product: Product) {

        if (!product.id) {

            product.id = uuid();
            addProduct(product).then(() => navigate('/products'));
        }
        else {

            updateProduct(product).then(() => navigate('/products'));
        }
    }

    if (loadingInitial) return <LoadingComponents content='Load product...' />

    return (

        <Segment clearing>
            <Header content='Product form' color='teal' style={{ textAlign: 'center', fontSize: '23px' }}></Header>
            <Formik
                enableReinitialize
                initialValues={product}
                onSubmit={values => handleSubmit(values)}
                validationSchema={ValidationRules}
            >

                {({ handleSubmit, isValid, isSubmitting, dirty }) => (

                    <Form className='ui form' onSubmit={handleSubmit}>
                        <MyTextInput placeholder='Name' name='name' label='Name' />
                        <MyTextInput placeholder='U.M.' name='um' label='Unitate masura' />
                        <MyTextInput placeholder='Price' name='price' label='Price' />
                        <MyTextInput placeholder='Description' name='description' label='Description' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loadingEdit}
                            floated='right'
                            type='submit'
                            positive
                            content={id ? "Update" : "Add"}
                        />
                        <Button as={Link} to='/products' floated='right' type='button' negative content={"Cancel"} />

                    </Form>

                )}
            </Formik>

        </Segment>

    )
})