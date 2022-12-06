import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import App from './App';
import Navbar from './components/Navbar';

const client = ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<App/>}/>
      </Routes>
    </ApolloProvider>
  </BrowserRouter>
);
