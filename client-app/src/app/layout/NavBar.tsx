import { NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src='assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    Invoices
                </Menu.Item>
                <Menu.Item>
                    <Dropdown item text='Administration'>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to='/customer' text='Customers'></Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/products' text='Products'></Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/issuer' text='Issuer'></Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/series' text='Invoice Series'></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text='Invoices'>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to='/invoicesList' text='Invocies List'></Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item>
                    <Button
                        as={NavLink} to='/newInvoice'
                        positive
                        content='New Invoice' />
                </Menu.Item>
            </Container>
        </Menu>


    )
}