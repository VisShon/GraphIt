import React from 'react';
import Loader from '../components/Loader';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import MemberCard from '../components/MemberCard';
const getMembers = loader('../apollo/memberQuery.gql');

function Members() {
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
          <tr>
            {data.members.map((member) => (
              <MemberCard key={member.id} 
                          name={member.name} 
                          email={member.email} 
                          phone={member.phone}/>
            ))}
          </tr>
        </tbody>
    </table>  

)}
export default Members;