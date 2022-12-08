import React from 'react';
import AddMember from '../components/AddMember';
import AddDepartment from '../components/AddDepartment';
import Member from '../components/Members';
import Department from '../components/Departments';

function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
          <AddMember/>
          <AddDepartment/>
      </div>
      <Member/>
      <hr/>
      <Department/>
    </>
)}
export default Home;