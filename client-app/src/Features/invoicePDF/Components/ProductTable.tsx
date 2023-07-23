import React, { Fragment } from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'
import CapTabel from './TableHead';
import ListaProduse from './ProductsList';
import TotalFactura from './InvoiceTotal';

const productsTableStyles = StyleSheet.create({

    productsTable: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd'
    }
});

const productsTable = () => (

    <Fragment>
        <View style={productsTableStyles.productsTable}>
            <CapTabel />
            <ListaProduse />
            <TotalFactura />
        </View>
    </Fragment>


);

export default productsTable;