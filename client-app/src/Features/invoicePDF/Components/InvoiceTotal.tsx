import React, { Fragment } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { useStore } from '../../../app/store/store';

export default function TotalFactura() {

    const { invoiceStore } = useStore();
    const { calculusTotalPriceWithoutVAT, calculusInvoiceVAT, calculusInvoiceTotalAmmount } = invoiceStore;

    const borderColor = '#90e5fc';
    const totalFacturaStyle = StyleSheet.create({

        row: {

            flexDirection: 'row',
            borderBottomColor: '#bff0fd',
            borderBottomWidth: 1,
            alignItems: 'center',
            textAlign: 'center',
            height: 24,
            fontStyle: 'bold',

        },
        emptryField: {

            width: '74%',
            alignSelf: 'center',
            textAlign: 'center',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        totalWithoutVAT: {
            width: '14%',
            alignSelf: 'center',
            textAlign: 'right',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: '3px'
        },
        VATtotal: {
            width: '12%',
            alignSelf: 'center',
            textAlign: 'right',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: '3px'
        },
        generalTotal: {
            width: '12%',
            alignItems: 'center',
            textAlign: 'right',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: '3px',
            backgroundColor: '#E8E7EE'
        }

    });

    const invoiceTotal =
        <Fragment>
            <View style={totalFacturaStyle.row}>
                <Text style={totalFacturaStyle.emptryField}>{' '}</Text>
                <Text style={totalFacturaStyle.totalWithoutVAT}>
                    {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 }).format(calculusTotalPriceWithoutVAT())}
                </Text>
                <Text style={totalFacturaStyle.VATtotal}>
                    {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 }).format(calculusInvoiceVAT())}
                </Text>
            </View>
            <View style={totalFacturaStyle.row}>
                <Text style={[totalFacturaStyle.emptryField, { width: '88%' }]}>TOTAL :</Text>
                <Text style={totalFacturaStyle.generalTotal}>
                    {Intl.NumberFormat('ro-ro', { maximumFractionDigits: 2 }).format(calculusInvoiceTotalAmmount())}
                </Text>
            </View>
        </Fragment>

    return (<Fragment>{invoiceTotal}</Fragment>)
}