import React from 'react'
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

function MemberInfo({name,email,phone}) {
  return (
    <>
      <h5 className='mt-5'>Team Lead</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <FaIdBadge className='icon' /> 
          {name}
        </li>
        <li className='list-group-item'>
          <FaEnvelope className='icon' /> 
          <a href={`mailto:${email}`}>
           {email}
          </a>
        </li>
        <li className='list-group-item'>
          <FaPhone className='icon' />
          <a href={`tel:${phone}`}>
           {phone}
          </a>
        </li>
      </ul>
    </>
  )
}

export default MemberInfo