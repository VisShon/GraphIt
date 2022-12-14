import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function LoginCallback() {
    useEffect(() => {

2:28:29 AM: Section completed: postprocessing
2:28:27 AM: src/components/Research/profCard.jsx
2:28:27 AM:   Line 2:9:     'useState' is defined but never used                                                                       no-unused-vars
2:28:27 AM:   Line 12:29:   Expected '===' and instead saw '=='                                                                        
    },[]);
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <FaExclamationTriangle className='text-danger' size='5em' />
      <h1>Wait</h1>
      <p className='lead'>Loading</p>
      <Link to='/' className='btn btn-primary'>
        Go Back
      </Link>
    </div>
  );
}

export default LoginCallback;