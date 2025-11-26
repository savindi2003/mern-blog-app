import React from 'react'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='flex grid items-center w-full h-24 grid-cols-2'>

        <div className='ml-10 text-4xl font-bold text-purple-600'>
            Bliss Blogs
        </div>

        <div className='flex flex-row-reverse gap-5 mr-10'>

          
          {/* <Link to="/auth">
          <p className='hover:text-purple-600'>Auth</p>
          </Link> */}

          <Link to="/account">
          <p className='hover:text-purple-600'>Account</p>
          </Link>

          <Link to="/new">
          <p className='hover:text-purple-600'>Create</p>
          </Link>

          <Link to="/mainhome">
           <p className='hover:text-purple-600'>Home</p>
          </Link>
            
        </div>
      
    </div>
  )
}

export default Nav
