import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Step } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

export default observer(function Etape() {

    const { invoiceStore } = useStore();
    const { invoiceCustomer, productsList } = invoiceStore;

    const { processStepStore } = useStore();
    const { changeProcessStep, processStep } = processStepStore;

    useEffect(() => {

        if (invoiceCustomer.name !== '')
            changeProcessStep(2);


    }, [invoiceCustomer.name, changeProcessStep])

    function handleChangeStep(step: number) {

        switch (step) {
            case 1:
                changeProcessStep(step);
                break;

            case 2:
                if (invoiceCustomer.name !== '')
                    changeProcessStep(step);
                break;

            case 3:
                if (productsList.size >= 1)
                    changeProcessStep(step);
                break;

        }
    }

    return (

        <Step>
            <Step.Group ordered>
                <Step
                    {...(invoiceCustomer.name !== '') ?

                        { completed: true, link: true }
                        :
                        { completed: false, link: false }
                    }
                    {...(processStep === 1) ?
                        { active: true } : { active: false }
                    }
                    onClick={() => handleChangeStep(1)}
                >
                    <Step.Content >
                        <Step.Title>Customer selection</Step.Title>
                        {invoiceCustomer !== undefined &&
                            <Step.Content style={{ color: 'green', fontWeight: 'bold' }}>{invoiceCustomer.name}</Step.Content>
                        }
                    </Step.Content>
                </Step>
                <Step
                    {...(productsList.size >= 1) ?
                        { completed: true, link: true }
                        :
                        { completed: false, link: false }
                    }
                    {...(processStep === 2) ?
                        { active: true } : { active: false }
                    }
                    onClick={() => handleChangeStep(2)}
                >
                    <Step.Content>
                        <Step.Title>Products selection</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    {...(productsList.size >= 1) ?
                        { link: true } : { link: false }
                    }
                    {...(processStep === 3) ?
                        { active: true } : { active: false }
                    }
                    onClick={() => handleChangeStep(3)}
                >
                    <Step.Content>
                        <Step.Title>Create invoice</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group >
        </Step >
    )
})