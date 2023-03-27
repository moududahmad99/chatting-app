import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebaseConfig from './dbDatabase/FirebaseConfig';
import { Provider } from 'react-redux';
import reduxStore from './Features/Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={reduxStore}>
        <App />
    </Provider>
);