import React from 'react'

function DepartmentCard({name,status,_id}) {
  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{name}</h5>

            <a className='btn btn-light' href={`/department/${_id}`}>
              View
            </a>
          </div>
          <p className='small'>
            Status: <strong>{status}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DepartmentCard