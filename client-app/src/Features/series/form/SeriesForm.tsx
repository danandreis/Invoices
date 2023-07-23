import React, { useEffect, useState } from 'react'
import { invoiceSeries } from '../../../app/modules/invoiceSeries';
import { useStore } from '../../../app/store/store'
import * as Yup from 'yup'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Formik } from 'formik';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite';

export default observer(function SeriesForm() {

    const { seriesStore } = useStore();
    const { loadingEdit, addSeries, loadActiveSeries, updateSeries } = seriesStore;
    const [nrFinalPrecedent, setnrFinalPrecedent] = useState(1); //Numar final al seriei anterioare - daca exista
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentSeries, setCurrentSeries] = useState<invoiceSeries>({

        id: '',
        allocationDate: new Date(),
        series: '',
        startNo: 1,
        endNo: 2,
        currentNo: 1,
        active: 1

    });

    const [activeSeries, setActiveSeries] = useState<invoiceSeries>({

        id: '',
        allocationDate: null,
        series: '',
        startNo: 0,
        endNo: 0,
        currentNo: 0,
        active: 0

    });

    var validatingForm = Yup.object({

        allocationDate: Yup.date().required(),
        series: Yup.string().required('The series is mandatory'),
        startNo: Yup.number().integer("The number must be an integer!")
            .min(nrFinalPrecedent, (nrFinalPrecedent !== 1) ? `The number shall not be less tha  ${nrFinalPrecedent}. The last allocated number from the last series` : "The start number mut be grater than 1")
            .required('The starting numerb of the series is mandatory '),
        endNo: Yup.number().integer("The number must be integer!")
            .min(currentSeries.startNo + 1, "The number shall be greater than starting number of the series")
            .required('The final number of the series is mandatory'),
        currentNo: Yup.number().min(currentSeries.startNo).required(),
        active: Yup.number().min(0).required()
    })

    useEffect(() => {

        if (activeSeries.id === '')
            loadActiveSeries().then((s) => setActiveSeries(s));

    }, [activeSeries.id, loadActiveSeries])

    useEffect(() => {

        if (!id) {
            setCurrentSeries({ ...currentSeries, id: '', series: activeSeries.series, allocationDate: new Date(), startNo: activeSeries.endNo + 1, endNo: activeSeries.endNo + 2, currentNo: activeSeries.endNo + 1 });

            setnrFinalPrecedent(activeSeries.endNo + 1);

        }
        else {

            setCurrentSeries(activeSeries);
            setnrFinalPrecedent(activeSeries.startNo);

        }



    }, [id, activeSeries])

    function handleOnSubmit(series: invoiceSeries) {

        if (!id) {

            series.id = uuid();
            series.allocationDate = new Date()

            //actualizeaza seria curenta - setare active = 0.
            activeSeries.active = 0;
            updateSeries(activeSeries).then(() => addSeries(series).then(() => navigate('/series')))

        }
        else {

            updateSeries(series).then(() => navigate('/series'))

        }

    }

    if (activeSeries != null) {

        if (!activeSeries.id) return <LoadingComponents content={'Loading data ...'} />

    }


    return (

        <Segment clearing>

            <Header color='teal' style={{ textAlign: 'center', fontSize: '21px' }} content='Form for adding new series' />

            <Formik
                initialValues={currentSeries}
                enableReinitialize
                validationSchema={validatingForm}
                onSubmit={(values) => handleOnSubmit(values)}
            >

                {({ isValid, isSubmitting, dirty, handleSubmit }) => (

                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        <MyTextInput placeholder={'Serie'} name={'series'} label={'Serie'} />
                        <MyTextInput
                            placeholder={'Start number'}
                            name={'startNo'}
                            label={'Start number'}

                        />
                        <MyTextInput
                            placeholder={'Final number'}
                            name={'endNo'}
                            label={'Final number'}
                        />

                        <Button
                            positive
                            content={(id ? 'Update' : 'Add')}
                            floated='right'
                            type='submit'
                            loading={loadingEdit}
                            disabled={isSubmitting || !dirty || !isValid}
                        />

                        <Button as={Link} to={'/series'} negative floated='right' type='button'> Cancel</Button>

                    </Form>

                )}

            </Formik>
        </Segment>

    )

})