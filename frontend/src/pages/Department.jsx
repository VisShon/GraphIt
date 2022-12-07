import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import MemberInfo from '../components/MemberInfo';
import DeleteButton from '../components/DeleteButton';
import EditForm from '../components/EditForm';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
const getDepartment = loader('./departmentQuery.gql');


function Department() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getDepartment, { 
    variables: { id } 
  });
  return (
    error?<>Something went wrong</>:
    loading?<Loader/>:
    <div className='mx-auto w-75 card p-5'>
      <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
        Back
      </Link>

      <h1>{data.department.name}</h1>
      <p>{data.department.lastmilestone}</p>

      <h5 className='mt-3'>Project Status</h5>
      <p className='lead'>{data.department.status}</p>

      <MemberInfo name={data.department.client.name} 
                  email={data.department.client.email} 
                  phone={data.department.client.phone} />
                  
      <EditForm name={data.department.name} 
                milestone={data.department.lastmilestone} 
                status={data.department.status} 
                _id={data.department._id} />

      <DeleteButton projectId={data.department._id} />
    </div>
  )
}

export default Department