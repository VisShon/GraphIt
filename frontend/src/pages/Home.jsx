import React from 'react';
import AddMember from '../components/AddMemberModal';
import AddDepartment from '../components/AddDepartmentModal';
import Member from '../components/Members';
import Department from '../components/Departments';
import axios from 'axios';
function Home() {
  const onClick = async() => {
    const res = await axios.get('http://localhost:8000/auth/callback/success',
    {withCredentials:true})
    console.log(res);
  }
  return (
    <>
      <div className='d-flex gap-3 mb-4 justify-content-center'>
          <AddMember/>
          <AddDepartment/>
      </div>

      {/* <button onClick={onClick}>
        User
      </button> */}

      <Department/>
      <hr/>
      <Member/>
    </>
)}
export default Home;