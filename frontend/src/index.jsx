import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Error from './pages/Error';
import Department from './pages/Department';
import Profile from './pages/Profile';

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
        <Route path="/" element={<Home/>}/>
        <Route path="/department/:id" element={<Department/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
    </ApolloProvider>
  </BrowserRouter>
);
