import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import './assets/css/style.css'
import { ToastContainer } from 'react-toastify';

import RoutesFile from './routes';
// others

ReactDOM.render(
  <>
    <RoutesFile />
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  </>,
  document.getElementById('root')
);
