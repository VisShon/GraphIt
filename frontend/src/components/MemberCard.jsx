import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

const DeleteMember = loader('../apollo/Member/deleteMember.gql');
const GetMembers = loader('../apollo/Member/getMembers.gql');
const GetDepartments = loader('../apollo/Department/getDepartments.gql');

function MemberCard({name,email,phone,key}) {
  
  const [deleteClient] = useMutation(DeleteMember, {
    variables: { id: key },
    refetchQueries: [{ query: GetMembers }, { query: GetDepartments }],
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