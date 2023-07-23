import React, { Fragment } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'

const borderColor = '#90e5fc';
const tableHeaderStyle = StyleSheet.create({

    row: {

        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        backgroundColor: '#bff0fd',
        alignItems: 'center',
        textAlign: 'center',
        height: 24,
        fontStyle: 'bold',

    },
    index: {

        width: '8%',
        alignSelf: 'center',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    name: {
        width: '40%',
        alignSelf: 'center',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1
    },
    um: {
        width: '7%',
        alignSelf: 'center',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1
    },
    pricePerUnit: {
        width: '12%',
        alignSelf: 'center',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1
    },
    quantity: {
        width: '7%',
        alignSelf: 'center',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1
    },
    totalPrice: {
        width: '14%',
        alignSelf: 'center',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1
    },
    VAT: {
        width: '12%',
        alignSelf: 'center',
        textAlign: 'center',

    }
});

const tableHead = () => {

    const tableHead =
        <View style={tableHeaderStyle.row}>
            <Text style={tableHeaderStyle.index}>Index</Text>
            <Text style={tableHeaderStyle.name}>Name</Text>
            <Text style={tableHeaderStyle.um}>U.M.</Text>
            <Text style={tableHeaderStyle.pricePerUnit}>Unit price</Text>
            <Text style={tableHeaderStyle.quantity}>QTY.</Text>
            <Text style={tableHeaderStyle.totalPrice}>Total Price</Text>
            <Text style={tableHeaderStyle.VAT}>VAT</Text>
        </View>

    return (<Fragment>{tableHead}</Fragment>)
}



// <View style={tableHeaderStyle.container}>
//     <Text style={tableHeaderStyle.index}>Index</Text>
//     <Text style={tableHeaderStyle.name}>Denumire</Text>
//     <Text style={tableHeaderStyle.um}>U.M.</Text>
//     <Text style={tableHeaderStyle.pricePerUnit}>Pret Unitar</Text>
//     <Text style={tableHeaderStyle.quantity}>Cantitate</Text>
//     <Text style={tableHeaderStyle.totalPrice}>Pret Total</Text>
//     <Text style={tableHeaderStyle.VAT}>TVA</Text>
// </View>

export default tableHead;