import React,{useState} from 'react';
import {FaEdit} from 'react-icons/fa';
import { useMutation} from '@apollo/client';
import { loader } from 'graphql.macro';
const UpdateMember = loader('../apollo/Member/updateMember.gql');
const GetMembers = loader('../apollo/Member/getMembers.gql');


function EditMemberModal({id,oldName,oldEmail,oldPhone}) {
  const [name, setName] = useState(oldName);
  const [email, setEmail] = useState(oldEmail);
  const [phone, setPhone] = useState(oldPhone);

  const [editmem] = useMutation(UpdateMember, {
    variables: { 
      id,
      name, 
      email, 
      phone, 
    },
    update(cache, { data: { editmem } }) {
      const { members } = cache.readQuery({ query: UpdateMember });
      cache.writeQuery({
        query: GetMembers,
        data: { members: [...members, editmem] },
      });
    },
  });

  const onSubmit = () => {
    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }
    editmem(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary btn-sm mx-3'
        data-bs-toggle='modal'
        data-bs-target='#editMemberModal'
      >
        <FaEdit />
      </button>

      <div
        className='modal fade'
        id='editMemberModal'
        aria-labelledby='editMemberModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModalLabel'>
                Edit Member
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-secondary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditMemberModal