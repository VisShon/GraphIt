import React from 'react'
import Loader from '../components/Loader';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import DepartmentCard from '../components/DepartmentCard';
const GetDepartments = loader('../apollo/Department/getDepartments.gql');

function Departments() {
  const {loading, error, data} = useQuery(GetDepartments);
  return (
    error?<>Something went wrong</>:
    loading?<Loader/>:
    <>
      {data.departments.length > 0 ? (
        <div className='row mt-4 mx-4'>
          {data.departments.map((department,index) => (
            <DepartmentCard key={index} 
                            name={department.name} 
                            status={department.status} 
                            _id={department._id}/>
          ))}
        </div>
      ) : (
        <p>No Departments</p>
      )}
    </>
  )
}

export default Departments