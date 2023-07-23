import { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { DetailedInvoice } from "../../../app/modules/detailedInvoice";
import { useStore } from "../../../app/store/store";
import HeaderTabel from "../InvoicesList/HeadetTable";
import List from "../InvoicesList/List";
import { observer } from "mobx-react-lite";

export default observer(function InvoicesList() {

    const { invoiceDetailsStore } = useStore();
    const { loadInvoiceList } = invoiceDetailsStore;

    const [invoicesList, setInvoicesList] = useState<DetailedInvoice[]>();

    useEffect(() => {

        loadInvoiceList().then((list) => setInvoicesList(list))


    }, [])


    if (invoicesList === undefined) return <LoadingComponents content={"The invoices list is loading ...."} />

    return (

        <Table singleLine celled>
            <HeaderTabel />
            <List />
        </Table>

    )
})