import React from 'react';
import Loader from '../components/Loader';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import MemberCard from '../components/MemberCard';
const getMembers = loader('./memberQuery.gql');

function Home() {
  const {loading, error, data} = useQuery(getMembers);

  return (
    error?<>Something went wrong</>:
    loading?<Loader/>:
    <table className='table table-hover mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <MemberCard key={client.id} client={client} />
          ))}
        </tbody>
    </table>  

)}
export default Home;