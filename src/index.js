import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; //berfungsi untuk menghubungkan data dlm project
import { createStore } from 'redux'; //mmenggabungkan semua data yg ada dlm folder redux
import Reducer from './redux/reducer'; // unutk mengambil data yg telah di olah oleh authAction yg di teruskan ke authReducer 

const storeReducer = createStore(Reducer)


ReactDOM.render(
    <Provider store={storeReducer}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
