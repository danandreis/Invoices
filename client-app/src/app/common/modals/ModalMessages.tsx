import { useState } from 'react'
import { Button, Message, Modal } from 'semantic-ui-react'

interface Props {

    title: string,
    message: string
    type: string
}


export default function ModalMessages({ title, message, type }: Props) {

    const [openModal, setOpenModal] = useState(true)

    return (
        <Modal
            open={openModal}
            size="tiny"
            dimmer>
            <Modal.Header>
                {title}
            </Modal.Header>
            <Modal.Content>
                {type === 'error' &&
                    <Message negative style={{ fontWeight: 'bold' }}>
                        {message}
                    </Message>
                }
            </Modal.Content>
            <Modal.Actions>
                <Button
                    positive
                    content='YES'
                    onClick={() => { setOpenModal(false) }
                    }
                />
            </Modal.Actions>
        </Modal >)
}