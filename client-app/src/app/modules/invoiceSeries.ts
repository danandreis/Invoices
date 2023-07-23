export interface invoiceSeries {

    id: string,
    allocationDate: Date | null,
    series: string,
    startNo: number,
    endNo: number,
    currentNo: number,
    active: number
}