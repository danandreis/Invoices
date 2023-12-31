import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom'
import { store, StoreContext } from './app/store/store';
import { router } from './app/router/Routes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
  //<React.StrictMode>
  //<RouterProvider router={router} />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
