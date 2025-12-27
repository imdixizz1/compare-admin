import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import axios from "axios";
import { baseURL, key } from './component/util/config';
import { Provider } from 'react-redux';
import store from "./redux/store";
import Loader from './component/util/Loader';
import { ToastContainer } from 'react-toastify';
// import { CLOSE_LOADER, LOADER_OPEN } from './component/store/dialogue/dialogue.type';

// Default Base URL Join In Axios
axios.defaults.baseURL = baseURL;

// Default Key Join In Axios
axios.defaults.headers.common["key"] = key;

// axios.interceptors.request.use(
//   (req) => {
//     store.dispatch({ type: LOADER_OPEN });
//     return req;
//   },
//   (error) => {
//     console.log(error);
//   }
// );

// axios.interceptors.response.use(
//   (res) => {
//     store.dispatch({ type: CLOSE_LOADER });
//     return res;
//   },
//   (err) => {
//     if (err.message === "Network Error") {
//     }
//     store.dispatch({ type: CLOSE_LOADER });
//     return Promise.reject(err);
//   }
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Loader />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
