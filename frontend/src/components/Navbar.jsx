import React from 'react'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav className='navbar bg-light mb-4 p-2'>
      <a className='navbar-brand' href='/'>
        <div className='d-flex'>
          <img src={logo} alt='logo' className='mr-2' />
          <div>GraphIt</div>
        </div>
      </a>
    </nav>
  )
}

export default Navbar