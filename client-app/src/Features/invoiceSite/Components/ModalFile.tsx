import react, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'


export default function ModalFile() {

    const [openModal, setOpenModal] = useState(true)

    const navigate = useNavigate();

    return (
        <Modal
            open={openModal}
            size="tiny"
            dimmer>
            <Modal.Header>
                Save invoice data
            </Modal.Header>
            <Modal.Content>
                Invoice data were successfully saved in database!
            </Modal.Content>
            <Modal.Actions>
                <Button
                    positive
                    content='YES'
                    onClick={() => {
                        setOpenModal(false)
                        navigate('/invoicesList')
                    }
                    }
                />
            </Modal.Actions>
        </Modal>)
}