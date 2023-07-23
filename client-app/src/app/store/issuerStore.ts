import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Issuer } from "../modules/issuer";

export default class IssuerStore {

    issuerDB: Issuer | undefined = undefined;
    loadingEdit = false;
    loadingDelete = false;
    LoadingInitial = false;

    constructor() {

        makeAutoObservable(this)

    }

    loadIssuer = async () => {

        this.LoadingInitial = true;

        try {

            const issuer = await agent.issuerDB.details();
            this.setIssuer(issuer);
            this.setLoadingInitial(false);
            return this.issuerDB;

        } catch (error) {

            console.log(error);
            runInAction(() => this.LoadingInitial = false);

        }

    }

    addIssuer = async (issuer: Issuer) => {

        this.loadingEdit = true;

        try {

            await agent.issuerDB.add(issuer);

            this.setloadingEdit(false);

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingEdit = false);
        }

    }

    updateIssuer = async (issuer: Issuer) => {

        this.loadingEdit = true;

        try {

            await agent.issuerDB.update(issuer);
            this.setloadingEdit(false);

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingEdit = false);
        }


    }

    deleteIssuer = async (id: string) => {

        this.loadingDelete = true;

        try {

            await agent.issuerDB.delete(id);
            this.setLoadingDelete(false);

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingDelete = false);
        }

    }

    setLoadingInitial = (status: boolean) => {

        this.LoadingInitial = status;
    }

    setLoadingDelete = (status: boolean) => {

        this.loadingDelete = status;
    }

    setloadingEdit = (status: boolean) => {
        this.loadingEdit = status;
    }

    setIssuer = (issuer: Issuer[]) => {
        this.issuerDB = issuer.at(0);
    }

    detIssuer = () => {
        return this.issuerDB;
    }

}