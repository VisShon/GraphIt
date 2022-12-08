import React from 'react'
import Loader from '../components/Loader';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import DepartmentCard from '../components/DepartmentCard';
const getDepartments = loader('../apollo/departmentQuery.gql');

function Departments() {
  const {loading, error, data} = useQuery(getDepartments);

  return (
    error?<>Something went wrong</>:
    loading?<Loader/>:
    <>
      {data.departments.length > 0 ? (
        <div className='row mt-4'>
          {data.departments.map((department) => (
            <DepartmentCard key={department.id} 
                            name={department.name} 
                            status={department.status} 
                            _id={department.id}/>
          ))}
        </div>
      ) : (
        <p>No Departments</p>
      )}
    </>
  )
}

export default Departments