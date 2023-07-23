import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/store/store';
import SeriesList from './SeriesList';


export default observer(function SeriesDashboard() {

    const { seriesStore } = useStore();

    const { loadSeries, loadingInitial, seriesRegistry } = seriesStore;

    useEffect(() => {

        if (seriesRegistry.size <= 1) loadSeries();


    }, [loadSeries, seriesRegistry])


    if (loadingInitial) return <LoadingComponents content={'Loading the allocated series ...'} />

    return (

        <Grid>
            <Grid.Column width={10}>

                <SeriesList />

            </Grid.Column>
        </Grid>

    )

})