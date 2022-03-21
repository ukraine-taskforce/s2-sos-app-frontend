import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout'
import AppRoutes from './routes'
import './App.css';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Layout>
  );
}

export default App;
