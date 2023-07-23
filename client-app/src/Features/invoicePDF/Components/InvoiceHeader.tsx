import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { useStore } from "../../../app/store/store";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { observer } from "mobx-react-lite";

export default observer(function InvoiceHeader() {

    const { invoiceStore } = useStore()
    const { invoiceCustomer, invoiceIssuer, activeSeries } = invoiceStore

    const styles = StyleSheet.create({

        generalViewStyle: {

            flexDirection: 'row',
            alignItems: 'center',
            width: 1000,
            marginTop: 50

        },

        viewEmitentStye: {

            width: '22%',
            marginTop: 5,
            height: 100,
            fontSize: 9,
        },

        viewSeriesDateStyle: {

            //Setari pentru casuta cu seria, numarul si data facturi
            width: '9%',
            margin: '10px',
            marginTop: 5,
            alignItems: 'center',
            paddingTop: '5px',
            fontSize: 9,
            backgroundColor: '#E8E7EE'

        },


        viewClientStyle: {

            width: '22%',
            marginTop: 5,
            fontSize: 9,
            height: 100,

        },

        issuerInfoStyle: {

            fontFamily: 'Helvetica',

        },

        issuerNameStyle: {

            fontFamily: 'Helvetica-Bold',
        }

    });

    return (

        <View style={styles.generalViewStyle}>
            <View style={styles.viewEmitentStye}>
                <Text style={[styles.issuerNameStyle, { fontFamily: 'Helvetica-BoldOblique' }]}>FURNIZOR :</Text>
                <Text style={styles.issuerNameStyle}>{invoiceIssuer.name}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceIssuer.address}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceIssuer.companyRegNo}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceIssuer.code}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceIssuer.iban}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceIssuer.bank}</Text>
            </View>
            <View style={styles.viewSeriesDateStyle}>
                <Text>INVOICE</Text>
                <Text></Text>
                <Text style={styles.issuerNameStyle}>
                    {activeSeries?.series?.concat(' ').concat(activeSeries.currentNo!?.toString())}
                </Text>
                <Text style={styles.issuerInfoStyle}> {format(new Date(), "dd.MM.yyyy", { locale: ro }).toString()}</Text>
            </View>
            <View style={styles.viewClientStyle}>
                <Text style={[styles.issuerNameStyle, { fontFamily: 'Helvetica-BoldOblique' }]}>CLIENT : </Text>
                <Text style={styles.issuerNameStyle}>{invoiceCustomer.name}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceCustomer.address}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceCustomer.companyRegNo}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceCustomer.code}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceCustomer.iban}</Text>
                <Text style={styles.issuerInfoStyle}>{invoiceCustomer.bank}</Text>
            </View>
        </View>
    )

})

// const InvoiceHeader = () => (

//     <View style={styles.generalViewStyle}>
//         <View style={styles.viewEmitentStye}>
//             <Text style={[styles.issuerNameStyle, { fontFamily: 'Helvetica-BoldOblique' }]}>FURNIZOR :</Text>
//             <Text style={styles.issuerNameStyle}>SOCIETATEA IMPORT EXPORT SRL</Text>
//             <Text style={styles.issuerInfoStyle}>Bucuresti</Text>
//             <Text style={styles.issuerInfoStyle}>J40/1254/2000</Text>
//             <Text style={styles.issuerInfoStyle}>RO1222912</Text>
//             <Text style={styles.issuerInfoStyle}>RO12RZBR1254784589562145</Text>
//             <Text style={styles.issuerInfoStyle}>Reiffeisen Bank SA</Text>
//         </View>
//         <View style={styles.viewSeriesDateStyle}>
//             <Text style={styles.issuerNameStyle}>ABC 1212</Text>
//             <Text style={styles.issuerInfoStyle}>04.03.2023</Text>
//         </View>
//         <View style={styles.viewClientStyle}>
//             <Text style={[styles.issuerNameStyle, { fontFamily: 'Helvetica-BoldOblique' }]}>CLIENT : </Text>
//             <Text style={styles.issuerNameStyle}>SOCIETATEA AAAAAAAAAAA SRL</Text>
//             <Text style={styles.issuerInfoStyle}>Bucuresti</Text>
//             <Text style={styles.issuerInfoStyle}>J40/1254/2000</Text>
//             <Text style={styles.issuerInfoStyle}>RO1222912</Text>
//             <Text style={styles.issuerInfoStyle}>RO12RZBR1254784589562145</Text>
//             <Text style={styles.issuerInfoStyle}>Reiffeisen Bank SA</Text>
//         </View>
//     </View>

// );

// export default InvoiceHeader;