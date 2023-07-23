import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { invoiceSeries } from '../../../app/modules/invoiceSeries';
import { useStore } from '../../../app/store/store';

export default observer(function SeriesList() {

    const { seriesStore } = useStore();
    const { loadActiveSeries, seriesRegistry } = seriesStore;
    const [nrRamase, setNrRamase] = useState(1);
    let update = true;

    const [activeSeries, setActiveSeries] = useState<invoiceSeries>({

        id: '',
        allocationDate: null,
        series: '',
        startNo: 0,
        endNo: 0,
        currentNo: 0,
        active: 0

    });


    useEffect(() => {

        loadActiveSeries().then((s) => setActiveSeries(s));

    }, [loadActiveSeries, seriesRegistry])

    useEffect(() => {

        if (activeSeries.id) {

            setNrRamase(activeSeries.endNo - activeSeries.currentNo);

            if (activeSeries.startNo === 0) {
                toast.info('Ther is no allocated series!')
            }
            else if ((activeSeries.endNo - activeSeries.currentNo) === 0) {
                toast.error('All the allocated numbers were used. Plese make a new allocation! ')
            }
            else if ((activeSeries.endNo - activeSeries.currentNo) < 10) {
                toast.info('Less that 10 series number left to be used!.')
            }

        }

    }, [activeSeries.id, activeSeries.endNo, activeSeries.currentNo, activeSeries.startNo])

    if (!activeSeries.id) return <LoadingComponents content={'Load the active series ...'} />

    return (

        <Fragment>
            <Header color='teal' style={{ textAlign: 'center', fontSize: '21px' }}>List of allocated series</Header>

            <div style={{ textAlign: 'right' }}>
                {!nrRamase &&
                    <Button as={Link} to={'/addSeries'} positive icon labelPosition='left'>
                        <Icon name='plus circle'></Icon>
                        Add new series
                    </Button>
                }
            </div>

            <Segment>

                <Item.Group divided>

                    {(seriesStore.seriesRegistry.size <= 1) && seriesStore.getSeriesByDate().map(serie => (

                        <Item key={serie.id}>
                            <Item.Content>
                                <Item.Header>{format(serie.allocationDate!, "dd MMM yyyy", { locale: ro }).toLocaleUpperCase()}</Item.Header>
                                <Item.Meta>
                                    <Label>Series : </Label>
                                    {serie.series}
                                </Item.Meta>
                                <Item.Meta>
                                    <Label>From</Label>
                                    {serie.startNo}
                                </Item.Meta>
                                <Item.Meta>
                                    <Label>To </Label>
                                    {serie.endNo}
                                </Item.Meta>
                                <Item.Meta>
                                    {(nrRamase !== 0 && serie.active === 1) &&
                                        <Label>Numar curent</Label>}
                                    {(nrRamase !== 0 && serie.active === 1) ? serie.currentNo : ""}
                                </Item.Meta>

                                <Item.Extra>
                                    {update && (nrRamase !== 0) &&
                                        <Button
                                            positive
                                            content='Edit'
                                            type='submit'
                                            floated='right'
                                            as={Link} to={`/editSeries/${serie.id}`}
                                        />}
                                    {update = false}

                                </Item.Extra>
                            </Item.Content>
                        </Item>

                    ))}

                </Item.Group>
            </Segment>

        </Fragment>

    )
})