import React from 'react'
import { FaHeart, FaComment } from 'react-icons/fa';

function BlogSmallListItem({blog, isSelected, onClick}) {

    const { _id, title, content, author, coverImage, createdAt,updatedAt,likes,comments } = blog;
    console.log(blog)

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    
  return (
     <div 
            onClick={onClick}
            className={`flex w-full p-4 mb-6 transition duration-300 bg-white rounded-lg shadow-md cursor-pointer 
                        ${isSelected ? 'border-2 border-purple-500' : 'hover:shadow-2xl'}`}
        >    
            {/* Left Section: Image + Last Update */}
            <div className="flex flex-col flex-shrink-0 w-1/3">
                <p className="mb-2 text-xs text-center text-gray-500">
                    Last Update at : {formatDate(updatedAt)}
                </p>
                <div className="h-32 overflow-hidden rounded-lg">
                    <img
                        className="object-cover w-full h-full"
                        src={coverImage}
                        alt="Blog cover"
                    />
                </div>
            </div>

            {/* Right Section: Content */}
            <div className="flex flex-col justify-between w-2/3 pl-6">
                <div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
                        {title}
                    </h2>
                    <p className="mb-3 text-sm text-justify text-gray-600 line-clamp-2">{content}</p>
                </div>

                {/* Bottom row: Read More + Like/Comment */}
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-indigo-600 transition duration-150 ease-in-out cursor-pointer hover:text-indigo-800">
                        Read More
                    </label>
                    <div className="flex space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                            <FaHeart className="text-red-500" />
                            <span>{likes.length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FaComment className="text-blue-500" />
                            <span>{comments.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default BlogSmallListItem
