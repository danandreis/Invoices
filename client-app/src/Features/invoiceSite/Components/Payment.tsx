import { ChangeEvent, useState } from 'react'
import { Segment, Checkbox, Input, Select, Table } from 'semantic-ui-react'
import { DatePicker } from '@mui/x-date-pickers'
import { CategoryOptions } from '../../../app/common/options/category'
import { observer } from 'mobx-react-lite'
import ModalMessages from '../../../app/common/modals/ModalMessages'

export default observer(function Plata() {

    const [paid, setPaid] = useState(true)
    const [error, setError] = useState(false)
    const [paymentDate, setPaymentDate] = useState(new Date())
    const [nr, setNr] = useState(0)

    function deactivatePayment(status: boolean) {

        setPaid(status)

    }

    function setData(value: any) {

        setError(false)

        if (value > new Date()) {

            setError(true)
            setPaymentDate(new Date());

        }
        else {

            setPaymentDate(value);

        }

    }

    function updateNr(value: string) {

        if (!isNaN(Number(value))) {

            setNr(Number(value));


        }
        else {

            setNr(0)


        }

    }

    return (

        <Segment>
            {error === true &&
                <ModalMessages
                    title='Date error'
                    message='Date can not be set after today!'
                    type='error' />
            }
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Checkbox
                                label='Unpaid'
                                onClick={() => deactivatePayment(!paid)}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                error={nr === 0 ? true : false}
                                disabled={!paid}
                                label="Ammount:"
                                size='small'
                                onChange={(e) => updateNr(e.target.value)}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <DatePicker
                                disabled={!paid}
                                label={'Payment date'}
                                defaultValue={new Date()}
                                value={paymentDate}
                                onChange={(value) => setData(value)} />
                        </Table.Cell>
                        <Table.Cell>
                            <Select
                                disabled={!paid}
                                placeholder='Payment type'
                                options={CategoryOptions}
                                defaultValue={CategoryOptions.at(0)?.value}
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

        </Segment>
    )

})
