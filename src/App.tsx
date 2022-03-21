import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout'
import AppRoutes from './routes'

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
