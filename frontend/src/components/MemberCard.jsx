import React from 'react';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

const DeleteMember = loader('../apollo/Member/deleteMember.gql');
const GetMembers = loader('../apollo/Member/getMembers.gql');
const GetDepartments = loader('../apollo/Department/getDepartments.gql');

function MemberCard({name,email,phone,_id}) {
  
  const [deleteClient,{error}] = useMutation(DeleteMember, {
    variables: { id: _id },
    refetchQueries: [{ query: GetMembers }, { query: GetDepartments }],
  });

  
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <FaTrash />
        </button>
        <button className='btn btn-secondary btn-sm mx-3' onClick={deleteClient}>
          <FaEdit />
        </button>
      </td>
    </tr>
  )
}

export default MemberCard