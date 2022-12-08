import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

const deleteDepartment = loader('../apollo/departmentMutation.gql');
const getDepartments = loader('../apollo/departmentQuery.gql');


function DeleteButton({_id}) {
    const navigate = useNavigate();
    const [onClickHandler] = useMutation(deleteDepartment,{
        variables:{id:_id},
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: getDepartments }],
    });

    return (
        <div className='d-flex mt-5 ms-auto'>
            <button className='btn btn-danger m-2' onClick={onClickHandler}>
                <FaTrash className='icon' /> Delete Department
            </button>
        </div>
    )
}

export default DeleteButton;