import React,{useState} from 'react';
import {FaUser} from 'react-icons/fa';
import { useMutation} from '@apollo/client';
import { loader } from 'graphql.macro';
const AddMember = loader('../apollo/Member/addMember.gql');
const GetMembers = loader('../apollo/Member/getMembers.gql');


function AddMemberModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addMem,{error}] = useMutation(AddMember, {
    variables: { 
      name, 
      email, 
      phone, 
    },
    update(cache, { data: { addMem } }) {
      const { members } = cache.readQuery({ query: GetMembers });
      cache.writeQuery({
        query: GetMembers,
        data: { members: [...members, addMem] },
      });
    },
  });
  const onSubmit = () => {
    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }
    addMem(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addMemberModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Member</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addMemberModal'
        aria-labelledby='addMemberModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModalLabel'>
                Add Member
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
                <a
                  href='http://localhost:8000/auth/google'
                  className='btn btn-success mx-2'
                >
                  Google
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMemberModal