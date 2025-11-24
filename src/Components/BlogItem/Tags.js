import React from 'react'

function Tags({tags}) {
  return (
    <>

    {tags.map((tag, index) => (

      <span key={index} class="px-3 py-1 text-purple-100 bg-purple-500 rounded-full text-sm mx-2 font-semibold">{tag}</span>

       ))}
 


    </>
  )
}

export default Tags
