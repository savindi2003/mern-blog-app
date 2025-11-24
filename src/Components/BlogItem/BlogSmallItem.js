import React from 'react'
import { Link } from "react-router-dom";

function BlogSmallItem({blog}) {

    const { _id, title, content, author, coverImage, createdAt } = blog;

    return (
        <Link to={`/blog/${_id}`}>
        <div className='w-64 transition duration-300 bg-white rounded-lg shadow-md h-fit hover:shadow-2xl'>
            

            {/* Main Image/Content Preview */}
            <div className="p-2 pt-2">
                <div className="h-32 overflow-hidden rounded-lg">
                    {/* This image would be the main visual for the blog post/team activity */}
                    <img
                        className="object-cover w-full h-32"
                        src={coverImage}
                        alt="Group of people working around a laptop"
                    />
                </div>
            </div>

            {/* Card Body (Title and Content) */}
            <div className="p-4">
                {/* Card Title */}
                <h2 className="mb-2 text-sm font-bold text-gray-900">{title}</h2>

                {/* Card Content/Excerpt */}
                <p className="mb-3 text-xs text-justify text-gray-600 line-clamp-3">
                    {content}</p>
                <label className="text-sm font-semibold text-purple-500 transition duration-150 ease-in-out hover:text-purple-800">
                    Read More
                </label>
            </div>

        </div>
        </Link>
    )
}

export default BlogSmallItem
