import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

const deleteMember = loader('../apollo/memberMutation.gql');
const getMembers = loader('../apollo/memberQuery.gql');
const getDepartments = loader('../apollo/departmentQuery.gql');

function MemberCard({name,email,phone,key}) {
  
  const [deleteClient] = useMutation(deleteMember, {
    variables: { id: key },
    refetchQueries: [{ query: getMembers }, { query: getDepartments }],
  });
  return (
    <>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </>
  )
}

export default MemberCard