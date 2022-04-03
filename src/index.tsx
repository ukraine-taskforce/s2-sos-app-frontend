import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

import { Howto } from './pages/howto';
import { FormContextProvider } from './others/contexts/form';
import { queryClient } from './others/contexts/api';

import './index.css';
import './others/contexts/i18n';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Landing from "./pages/landing/landing";
import Alerted from "./pages/alerted/alerted";
import {SosInfoContextProvider} from "./others/contexts/sosInfo";

ReactDOM.render(
    <React.StrictMode>
        {' '}
        <QueryClientProvider client={queryClient}>
            <SosInfoContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Howto />} />
                        <Route path='/landing' element={<Landing />} />
                        <Route path='/alerted' element={<Alerted />} />
                    </Routes>
                </BrowserRouter>
            </SosInfoContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
