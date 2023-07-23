import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product } from "../modules/product";
import { v4 as uuid } from 'uuid'
import _ from 'lodash'

export default class ProdusStore {

    productsRegistry = new Map<string, Product>();
    selectedProductsRegistry = new Map<String, Product>(); //lista produse rezultate din cautare
    selectedProduct: Product | undefined = undefined;
    loadingInitial = false;
    loadingEdit = false;
    loadingDelete = false;
    searchValue = '';

    constructor() {

        makeAutoObservable(this);
    }

    get productsListByName() {

        if (this.selectedProductsRegistry.size !== 0 || this.searchValue !== '') {

            return Array.from(this.selectedProductsRegistry.values()).sort((a, b) => {

                const name1 = a.name;
                const name2 = b.name;

                if (name1 > name2)
                    return 1;

                if (name1 < name2)
                    return -1;

                return 0;

            })
        }

        return Array.from(this.productsRegistry.values()).sort((a, b) => {

            const name1 = a.name;
            const name2 = b.name;

            if (name1 > name2)
                return 1;

            if (name1 < name2)
                return -1;

            return 0;

        })
    }

    loadProducts = async () => {

        this.setLoadingInitial(true);

        try {

            const produseDb = await agent.Products.list();

            produseDb.forEach(product => {

                this.productsRegistry.set(product.id, product);
            })

            this.setLoadingInitial(false);

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingInitial = false);
        }

    }

    loadProduct = async (id: string) => {

        let product = this.productsRegistry.get(id);

        if (product) {

            this.selectProduct(id);
            return product;
        }
        else {

            this.setLoadingInitial(true);

            try {

                const product = await agent.Products.details(id);
                this.productsRegistry.set(product.id, product);
                this.selectProduct(id);
                runInAction(() => this.loadingInitial = false);
                return product;


            } catch (error) {

                console.log(error);
                runInAction(() => this.loadingInitial = false);
            }

        }

    }

    addProduct = async (product: Product) => {

        this.loadingEdit = true;
        product.id = uuid();

        try {

            await agent.Products.add(product);

            runInAction(() => {

                this.productsRegistry.set(product.id, product);
                this.loadingEdit = false;

            })


        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingEdit = false);
        }

    }

    updateProduct = async (product: Product) => {

        this.loadingEdit = true;

        try {

            await agent.Products.update(product);
            this.productsRegistry.set(product.id, product);

            runInAction(() => this.loadingEdit = false);

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingEdit = false);
        }
    }

    deleteProduct = async (id: string) => {

        this.loadingDelete = true;

        try {

            await agent.Products.delete(id);
            this.productsRegistry.delete(id);
            runInAction(() => this.loadingDelete = false);

        } catch (error) {

            console.log(error);
            runInAction(() => this.loadingDelete = false);
        }

    }

    searchProducts = (value: string) => {

        this.selectedProductsRegistry.clear();

        var regEx = new RegExp(_.escapeRegExp(value), 'i');

        this.productsRegistry
            .forEach(product => {

                if (regEx.test(product.name)) {

                    this.selectedProductsRegistry.set(product.id, product);

                }

            })

        this.searchValue = value;
        return this.selectedProductsRegistry;

    }

    selectProduct = (id: string) => {

        this.selectedProduct = this.productsRegistry.get(id);
        return this.selectedProduct;

    }

    setLoadingInitial = (state: boolean) => {

        this.loadingInitial = state;
    }

}