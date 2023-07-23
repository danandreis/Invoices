import { makeAutoObservable } from "mobx";

export default class ProcessSteptStore {

    processStep: number = 1;

    constructor() {

        makeAutoObservable(this);

    }

    changeProcessStep = (newStep: number) => {

        this.processStep = newStep;
        return this.processStep;
    }

}