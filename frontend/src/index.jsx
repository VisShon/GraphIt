import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Error from './pages/Error';
import Department from './pages/Department';

const root = ReactDOM.createRoot(document.getElementById('root'));
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        members: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        departments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache 
});

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route path="/department/:id" element={<Department />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
