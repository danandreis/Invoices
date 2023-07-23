import React, { Fragment } from 'react';
import './style.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite'
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../Features/Home/HomePage';
import { ToastContainer } from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ro from 'date-fns/locale/ro'

function App() {

  const location = useLocation();

  return (

    <Fragment>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro} >

        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />

        {location.pathname === '/' ? <HomePage /> : (

          <Fragment>

            <NavBar />

            <Container style={{ marginTop: '7em' }}>
              <Outlet />
            </Container>

          </Fragment>

        )}
        
      </LocalizationProvider>
    </Fragment>
  );
}

export default observer(App);
