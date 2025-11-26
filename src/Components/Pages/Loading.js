import React from 'react'
import Nav from '../Nav/Nav'

function Loading() {
  return (

    <>
    <Nav/>
    <div className="flex flex-col items-center justify-center h-screen px-64 space-y-6 text-center">

        
 <div className="flex items-center justify-center py-10">
                                <div className="w-10 h-10 border-4 border-purple-400 rounded-full border-t-transparent animate-spin"></div>
                            </div>


      
    </div>
    </>
     
  )
}

export default Loading
