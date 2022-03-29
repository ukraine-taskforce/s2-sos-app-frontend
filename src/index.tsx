import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

import { Home } from './pages/home';
import { FormContextProvider } from './others/contexts/form';
import { queryClient } from './others/contexts/api';

import './index.css';
import './others/contexts/i18n';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        {' '}
        <QueryClientProvider client={queryClient}>
            <FormContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Home />} />
                        <Route path='/register' element={<Home />} />
                        {/* <Route path='/ua' element={<CountryDetail id='ua' />} />
                        <Route path='/pl' element={<CountryDetail id='pl' />} />
                        <Route path='/cz' element={<CountryDetail id='cz' />} />
                        <Route path='/de' element={<CountryDetail id='de' />} />
                        <Route path='*' element={<NotFound />} /> */}
                    </Routes>
                </BrowserRouter>
            </FormContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
