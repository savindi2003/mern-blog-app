import React from 'react'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='flex grid items-center w-full h-24 grid-cols-2'>

        <div className='ml-10 text-3xl font-bold text-purple-500'>
            Blogger
        </div>

        <div className='flex flex-row-reverse gap-5 mr-10'>

          <Link to="/mainhome">
           <p className='hover:text-purple-600'>Home</p>
          </Link>

          <Link to="/account">
          <p className='hover:text-purple-600'>Account</p>
          </Link>

          <Link to="/blog">
          <p className='hover:text-purple-600'>Single</p>
          </Link>

          <Link to="/author">
          <p className='hover:text-purple-600'>Author</p>
          </Link>

          <Link to="/new">
          <p className='hover:text-purple-600'>Create</p>
          </Link>

          <Link to="/update">
          <p className='hover:text-purple-600'>Update</p>
          </Link>

          <Link to="/auth">
          <p className='hover:text-purple-600'>Auth</p>
          </Link>
            
        </div>
      
    </div>
  )
}

export default Nav
