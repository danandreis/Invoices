import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { invoiceSeries } from "../modules/invoiceSeries";
import { v4 as uuid } from 'uuid'

export default class SeriesStore {

    seriesRegistry = new Map<string, invoiceSeries>();
    activeSeries: invoiceSeries | undefined = undefined;
    maxNo = 0;
    currentNo = 0;
    loadingInitial = false;
    loadingActive = false;
    loadingEdit = false;

    constructor() {

        makeAutoObservable(this);
    }

    getSeriesByDate() {

        return Array.from(this.seriesRegistry.values()).sort((a, b) =>

            b.allocationDate!.getTime() - a.allocationDate!.getTime());

    }


    loadSeries = async () => {

        this.loadingInitial = true;

        try {

            var seriiBD = await agent.Series.list();

            seriiBD.forEach((series) => {

                if (series.endNo > this.maxNo)
                    this.setMaxNo(series.endNo);

                series.allocationDate = new Date(series.allocationDate!);
                this.seriesRegistry.set(series.id, series);

            });

            this.setLoadingInitial(false);


        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingInitial = false);

        }

    }

    addSeries = async (series: invoiceSeries) => {

        series.id = uuid();
        this.setLoadingEdit(true);

        try {

            await agent.Series.add(series);
            this.seriesRegistry.set(series.id, series);
            this.seriesRegistry.forEach(serieRegistru => {

                serieRegistru.allocationDate = new Date(serieRegistru.allocationDate!)

            })

            this.setLoadingEdit(false);

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingEdit = false);
        }

    }

    updateSeries = async (series: invoiceSeries) => {

        this.loadingEdit = true;

        try {

            await agent.Series.update(series);

            runInAction(() => {

                this.seriesRegistry.set(series.id, series);
                this.seriesRegistry.forEach(serieRegistru => {

                    serieRegistru.allocationDate = new Date(serieRegistru.allocationDate!)

                })
                this.loadingEdit = false;

            })

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingEdit = false);
        }

    }

    loadActiveSeries = async () => {

        this.activeSeries = await agent.Series.activeSeries();

        return this.activeSeries;
    }

    setLoadingInitial = (status: boolean) => {
        this.loadingInitial = status;
    }

    setLoadingEdit = (status: boolean) => {
        this.loadingEdit = status;
    }

    setMaxNo = (nr: number) => {
        this.maxNo = nr;
    }

    setCurrentNo = (nr: number) => {
        this.currentNo = nr;
    }

}