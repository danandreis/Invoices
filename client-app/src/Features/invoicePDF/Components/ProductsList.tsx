import React, { Fragment } from 'react'
import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { useStore } from '../../../app/store/store';

export default function ProductsList() {

    const { invoiceStore } = useStore();
    const { productsList, getProductQuantity } = invoiceStore

    const borderColor = '#90e5fc';
    const styles = StyleSheet.create({

        row: {

            flexDirection: 'row',
            borderBottomColor: '#bff0fd',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            fontStyle: 'bold',

        },

        index: {

            width: '8%',
            alignSelf: 'center',
            textAlign: 'center',
            borderRightColor: borderColor,
            borderRightWidth: 1
        },
        name: {
            width: '40%',
            alignSelf: 'center',
            textAlign: 'center',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: '3px'
        },
        um: {
            width: '7%',
            alignSelf: 'center',
            textAlign: 'center',
            borderRightColor: borderColor,
            borderRightWidth: 1
        },
        PricePerUni: {
            width: '12%',
            alignSelf: 'center',
            textAlign: 'right',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: '3px'
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
            textAlign: 'right',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: '3px'
        },
        VAT: {
            width: '12%',
            alignSelf: 'center',
            textAlign: 'right',
            paddingRight: '3px'

        }
    });

    const coloane = Array.from(productsList.values()).map(produs =>
        <View style={styles.row} key={produs.id}>
            <Text style={styles.index}>{Array.from(productsList.values()).indexOf(produs) + 1}</Text>
            <Text style={styles.name}>{produs.name}</Text>
            <Text style={styles.um}>{produs.um}</Text>
            <Text style={styles.PricePerUni}>
                {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                    .format(Math.trunc((produs.price / 1.19) * 100) / 100)}
            </Text>
            <Text style={styles.quantity}>{getProductQuantity(produs.id)}</Text>
            <Text style={styles.totalPrice}>
                {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                    .format(getProductQuantity(produs.id)! * Math.trunc((produs.price / 1.19) * 100) / 100)}
            </Text>
            <Text style={styles.VAT}>
                {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 })
                    .format(getProductQuantity(produs.id)! * (produs.price - (Math.trunc((produs.price / 1.19) * 100) / 100)))}
            </Text>
        </View>
    )

    return (<Fragment>{coloane}</Fragment>);

}
