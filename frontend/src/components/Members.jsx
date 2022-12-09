import React from 'react';
import Loader from '../components/Loader';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import MemberCard from '../components/MemberCard';
const GetMembers = loader('../apollo/Member/getMembers.gql');

function Members() {
  const {loading, error, data} = useQuery(GetMembers);
  console.log(data);
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
            {data.members.map((member,index) => (
              <MemberCard _id={member._id} 
                          name={member.name} 
                          email={member.email} 
                          phone={member.phone}
                          key={index}/>
            ))}
        </tbody>
    </table>  

)}
export default Members;