import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Howto } from './pages/howto';

import './index.css';
import './others/contexts/i18n';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Landing from "./pages/landing/landing";
import Alerted from "./pages/alerted/alerted";
import { NotFound } from "./pages/notFound/index";
import { SosInfoContextProvider } from "./others/contexts/sosInfo";
import Emergency from "./pages/emergency/emergency";

ReactDOM.render(
    <React.StrictMode>
        {' '}
        <SosInfoContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Howto />} />
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/emergency' element={<Emergency />} />
                    <Route path='/alerted' element={<Alerted />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </SosInfoContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
