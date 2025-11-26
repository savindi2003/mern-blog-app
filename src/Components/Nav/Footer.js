import React from 'react'

function Footer() {
  return (
    <footer className="mt-10 text-white bg-purple-600">
      
      <div className="py-4 mt-6 text-center bg-purple-700">
        <p className="text-sm text-gray-200">
          &copy; {new Date().getFullYear()} Bliss Blogs. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
