import React,{useState} from 'react';
import {FaList} from 'react-icons/fa';
import Loader from './Loader';
import { useMutation, useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
const AddDepartment = loader('../apollo/Department/addDepartment.gql');
const GetDepartments = loader('../apollo/Department/getDepartments.gql');
const GetMembers = loader('../apollo/Member/getMembers.gql');

function AddDepartmentModal() {
  const [name, setName] = useState('');
  const [lastmilestone, setLastMilestone] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [status, setStatus] = useState('NEW');

  const { loading, error, data } = useQuery(GetMembers);
  
  const [addDept] = useMutation(AddDepartment, {
    variables: { 
      name, 
      lastmilestone, 
      teamLead, 
      status 
    },
    update(cache, { data: { addDept } }) {
      const { departments } = cache.readQuery({ query: GetDepartments });
      cache.writeQuery({
        query: GetDepartments,
        data: { departments: [...departments, addDept] },
      });
    },
  });


  const onSubmit = () => {
    if (name === '' || lastmilestone === '' || status === '') {
      return alert('Please fill in all fields');
    }
    addDept(name, lastmilestone, teamLead, status);
    setName('');
    setLastMilestone('');
    setStatus('NEW');
    setTeamLead('');
  };

  return (
    error?<>Something went wrong</>:
    loading?<Loader/>:
    <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addDepartmentModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Department</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addDepartmentModal'
            aria-labelledby='addDepartmentModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addDepartmentModalLabel'>
                    New Department
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
                      <label className='form-label'>Last Milestone</label>
                      <textarea
                        className='form-control'
                        id='lasmilestone'
                        value={lastmilestone}
                        onChange={(e) => setLastMilestone(e.target.value)}
                      ></textarea>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='NEW'>Not Started</option>
                        <option value='INPROGRESS'>In Progress</option>
                        <option value='COMPLETE'>Completed</option>
                      </select>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Team Lead</label>
                      <select
                        id='teamLead'
                        className='form-select'
                        value={teamLead}
                        onChange={(e) => setTeamLead(e.target.value)}
                      >
                        <option value=''>Select Member</option>
                        {data.members.map((member) => (
                          <option key={member._id} value={member._id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type='submit'
                      data-bs-dismiss='modal'
                      className='btn btn-primary'
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

export default AddDepartmentModal