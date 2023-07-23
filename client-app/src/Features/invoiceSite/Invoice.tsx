import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Segment, Table } from "semantic-ui-react";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useStore } from "../../app/store/store";
import CapTabel from "./Components/CapTabel";
import FooterTotal from "./Components/FooterTotal";
import Header from "./Components/Header";
import ListaProduse from "./Components/ProductsList";
import Payment from "./Components/Payment";


export default observer(function Invoice() {

    const { seriesStore } = useStore();
    const { loadActiveSeries } = seriesStore;

    const { issuerStore, invoiceStore } = useStore();
    const { newInvoice, activeSeries, addIssuer, setactiveSeries } = invoiceStore;
    const { loadIssuer } = issuerStore;

    useEffect(() => {

        if (newInvoice) {

            loadActiveSeries().then((series) => {

                setactiveSeries(series);

            })
        }

        loadIssuer().then((issuer) => {

            addIssuer(issuer!);
        })

    })

    if (activeSeries === undefined) return <LoadingComponents content={"Loading data ...."} />

    return (

        <Segment>
            <Header />

            <Payment />

            <Table singleLine celled>
                <CapTabel />
                <ListaProduse />
                <FooterTotal />
            </Table>

        </Segment>

    )

})