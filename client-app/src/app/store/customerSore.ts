import { makeAutoObservable } from 'mobx'
import agent from '../api/agent';
import { Customer } from '../modules/customer';
import { v4 as uuid } from 'uuid'
import { runInAction } from 'mobx';
import _ from 'lodash'

export default class CustomerStore {

    customersRegistry = new Map<String, Customer>();
    selectedCustomerRegistry = new Map<String, Customer>() //lista de clienti rezultati din cautare
    selectedCustomer: Customer | undefined = undefined;
    loadingEdit = false;
    loadingDelete = false;
    loadingInitial = false;
    rezultat = [];
    valoare = ''

    constructor() {

        makeAutoObservable(this);

    }

    get CustomerByName() {

        if (this.selectedCustomerRegistry.size !== 0 || this.valoare !== '') {

            return Array.from(this.selectedCustomerRegistry.values()).sort((a, b) => {

                const name1 = a.name.toUpperCase();
                const name2 = b.name.toUpperCase();

                if (name1 < name2)
                    return -1;

                if (name1 > name2)
                    return 1;

                return 0;

            })

        }

        return Array.from(this.customersRegistry.values()).sort((a, b) => {

            const name1 = a.name.toUpperCase();
            const name2 = b.name.toUpperCase();

            if (name1 < name2)
                return -1;

            if (name1 > name2)
                return 1;

            return 0;

        })
    }

    loadCustomers = async () => {

        this.loadingInitial = true;

        try {

            const customersList = await agent.Customers.list();

            customersList.forEach(customer => {

                this.customersRegistry.set(customer.id, customer);

            });

            this.setLoadingInitial(false);

        } catch (error) {

            console.log(error);
            this.setLoadingInitial(false);

        }

    }

    loadCustomer = async (id: string) => {

        let customer = this.customersRegistry.get(id);

        if (customer) {

            this.selectCustomer(id);
            return customer;

        }
        else {

            this.setLoadingInitial(true);
            try {

                let customer = await agent.Customers.details(id);
                this.customersRegistry.set(customer.id, customer);
                this.selectCustomer(id);
                runInAction(() => this.loadingInitial = false);
                return customer;

            } catch (error) {

                console.log(error);
                runInAction(() => this.loadingInitial = false);
            }

        }

    }


    setLoadingInitial = (state: boolean) => {

        this.loadingInitial = state;

    }


    selectCustomer = (id: string) => {

        this.selectedCustomer = this.customersRegistry.get(id);
        return this.selectedCustomer;
    }

    deleteSelectedCustomer = () => {

        this.selectedCustomer = undefined;
    }

    addCustomer = async (customer: Customer) => {

        this.loadingEdit = true;
        customer.id = uuid();

        try {

            await agent.Customers.add(customer);
            runInAction(() => {

                this.customersRegistry.set(customer.id, customer);
                //this.deleteSelectedCustomer();
                this.loadingEdit = false;

            })

        } catch (error) {

            console.log(error);
            runInAction(() => {
                this.loadingEdit = false;
            })
        }
    }

    updateCustomerData = async (customer: Customer) => {

        this.loadingEdit = true;

        try {

            await agent.Customers.update(customer);
            runInAction(() => {

                this.customersRegistry.set(customer.id, customer);
                //this.deleteSelectedCustomer();
                this.loadingEdit = false;
            })

        } catch (error) {

            console.log(error);
            runInAction(() => {

                this.loadingEdit = false;

            })
        }

    }

    deleteCustomer = async (id: string) => {

        this.loadingDelete = true;

        try {

            await agent.Customers.delete(id);

            runInAction(() => {

                this.customersRegistry.delete(id);
                //this.deleteSelectedCustomer();
                this.loadingDelete = false;

            })

        } catch (error) {

            console.log(error);
            runInAction(() => {

                this.loadingDelete = false;

            })
        }

    }

    searchCustomer = async (value: string) => {

        this.selectedCustomerRegistry.clear();

        const re = new RegExp(_.escapeRegExp(value), 'i');

        this.customersRegistry.forEach(customer => {

            if (re.test(customer.name)) {

                this.selectedCustomerRegistry.set(customer.id, customer);

            }
        })

        this.valoare = value;
        return this.selectedCustomerRegistry;

    }

}