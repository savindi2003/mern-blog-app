// import React, { useState } from 'react'; 
// import axios from 'axios';

// // ⭐️ Add currentUserId to the props
// function BlogItem({ blog, currentUserId }) { 

//     //like

//     const initialLikes = blog.likes;
//     const [likes, setLikes] = useState(initialLikes);

//      const isLiked = currentUserId && likes?.includes(currentUserId);

//     // Destructuring 'likes' is crucial here
//     const {_id, title, content, author, coverImage, createdAt} = blog;


//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//         });
//     };

//     // 2. Define the Icons (Filled and Outlined)
//     // Note: We'll put them in a function/component for cleaner rendering

//     const LikeIcon = () => {
//         // If the user has liked the post (isLiked is true)
//         if (isLiked) {
//             return (
//                 // Filled Heart Icon (Red)
//                 <svg 
//                     className="w-5 h-5 text-red-500 transition duration-200 ease-in-out hover:scale-110" 
//                     fill="currentColor" 
//                     viewBox="0 0 20 20" 
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
//                 </svg>
//             );
//         } else {
//             return (
//                 // Outlined Heart Icon (Gray/Red on hover)
//                 <svg 
//                     className="w-5 h-5 text-gray-400 transition duration-200 ease-in-out hover:text-red-500 hover:scale-110" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     strokeWidth="2" 
//                     viewBox="0 0 24 24" 
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
//                 </svg>
//             );
//         }
//     }

//     const handleLikeToggle = async ()=>{
//         if(!currentUserId){
//             alert("Please log in to like this post.");
//             return;
//         }

//         const prevLikes = likes;
//         const newLikes = isLiked ? likes.filter(id => id !== currentUserId) : [...likes, currentUserId]

//         setLikes(newLikes)

//         try {
//             const response = await axios.put(
//                 `http://localhost:5000/api/posts/${_id}/like`, 
//                 { userId: currentUserId },

//             );

//             setLikes(response.data.likes)

//             if(onLike);
//         } catch (error) {
//             console.error("Error updating like status:", error);
//             // Revert state if the API call fails
//             setLikes(prevLikes);
//             alert("Failed to update like status. Please try again.");
//         }

//     }


//     return (
//         <div className='transition duration-300 bg-white rounded-lg shadow-md cursor-pointer w-96 h-fit hover:shadow-2xl'>

//             <div className="flex items-center justify-between p-4">

//                 {/* Left Side: Author Details */}
//                 <div className="flex items-center">
//                     {/* Author Avatar/Image */}
//                     <div className="flex-shrink-0">
//                         <img
//                             className="object-cover w-10 h-10 rounded-full"
//                             src={author?.profilePic}
//                             alt=""
//                         />
//                     </div>

//                     {/* Author Name and Date */}
//                     <div className="ml-3">
//                         <p className="text-sm font-semibold text-gray-900">{author?.username}</p>
//                         <p className="text-xs text-purple-400">{formatDate(createdAt)}</p>
//                     </div>
//                 </div>

//                 {/* Right Side: Like Count and Icon (Clickable for liking/unliking) */}
//                 {/* ⭐️ Add a handler function here to communicate with your backend */}
//                 <div 
//                     className="flex items-center space-x-1 cursor-pointer" 
//                     onClick={handleLikeToggle}
//                 >

//                     {/* 3. Render the conditional icon */}
//                     <LikeIcon />

//                     {/* Like Count */}
//                     <span className="text-sm font-medium text-gray-700">
//                         {likes?.length > 0 ? likes.length : 0}
//                     </span>
//                 </div>

//             </div>

//             {/* Main Image/Content Preview... (rest of the code remains the same) */}
//             <div className="p-2 pt-0">
//                 <div className="h-48 overflow-hidden rounded-lg">
//                     <img
//                         className="object-cover w-full h-full"
//                         src={coverImage}
//                         alt="Group of people working around a laptop"
//                     />
//                 </div>
//             </div>

//             <div className="p-4">
//                 <h2 className="mb-2 text-xl font-bold text-gray-900">{title}</h2>
//                 <p className="mb-3 text-sm text-justify text-gray-600 line-clamp-3">{content}</p>
//                 <label className="text-sm font-semibold text-purple-500 transition duration-150 ease-in-out hover:text-purple-800">
//                     Read More
//                 </label>
//             </div>

//         </div>
//     )
// }

// export default BlogItem

import React, { useState } from 'react' // ⭐️ Import useState
import axios from 'axios'
import { getBlogTitle } from '@react-aria/tooltip'

// ⭐️ Add currentUserId and onLikeUpdate to the props
function BlogItem({ blog, currentUserId, onLikeUpdate }) {

    // Initial state derived from props
    const initialLikes = blog.likes;

    // ⭐️ 1. Local State Management for likes
    const [likes, setLikes] = useState(initialLikes);

    // Check if the logged-in user has liked the post based on local state
    const isLiked = currentUserId && likes?.includes(currentUserId);

    // Destructuring other props from blog object
    const { _id, title, content, author, coverImage, createdAt } = blog;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // ⭐️ 2. API Interaction Function
    const handleLikeToggle = async () => {
        if (!currentUserId) {
            // Use a nicer message box than alert() in a real app
            console.error("Please log in to like this post.");
            return;
        }

        // Optimistic UI Update: Update the UI instantly
        const prevLikes = likes;
        const newLikes = isLiked
            ? likes.filter(id => id !== currentUserId) // Unlike: remove ID
            : [...likes, currentUserId];                 // Like: add ID

        setLikes(newLikes);

        try {
            // ⭐️ Replace http://localhost:5000/api/ with your actual base URL if different
            const response = await axios.put(
                `http://localhost:5000/api/posts/${_id}/like`,
                { userId: currentUserId },
                // Add Authorization header if needed for protected routes
            );

            // If successful, update local state with the exact array from the backend
            const updatedLikes = response.data.likes || [];
            setLikes(updatedLikes);

            // ⭐️ 3. Call the parent function to update the central list state
            if (onLikeUpdate) {
                onLikeUpdate(_id, updatedLikes);
            }

        } catch (error) {
            console.error("Error updating like status:", error);
            // Revert state if the API call fails
            setLikes(prevLikes);
            // Display an error message to the user
        }
    };


    const LikeIcon = () => {
        // Icon logic based on isLiked state
        if (isLiked) {
            return (
                // Filled Heart Icon (Red)
                <svg
                    className="w-5 h-5 text-red-500 transition duration-200 ease-in-out hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
            );
        } else {
            return (
                // Outlined Heart Icon (Gray/Red on hover)
                <svg
                    className="w-5 h-5 text-gray-400 transition duration-200 ease-in-out hover:text-red-500 hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
            );
        }
    }


    return (
        <div className='h-full transition duration-300 bg-white rounded-lg shadow-md cursor-pointer w-96 hover:shadow-2xl'>

            <div className="flex items-center justify-between p-4">

                {/* Left Side: Author Details */}
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={author?.profilePic}
                            alt=""
                        />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-900">{author?.username}</p>
                        <p className="text-xs text-purple-400">{formatDate(createdAt)}</p>
                    </div>
                </div>

                {/* Right Side: Like Count and Icon (Now Clickable) */}
                <div
                    className={`flex items-center space-x-1 ${currentUserId ? 'cursor-pointer' : ''}`}
                    onClick={currentUserId ? handleLikeToggle : null}
                >
                    {/* Show icon only if logged in */}
                    <LikeIcon />

                    {/* Always show count */}
                    <span className="text-sm font-medium text-gray-700">
                        {likes?.length || 0}
                    </span>
                </div>


            </div>

            {/* Main Image/Content Preview */}
            <div className="p-2 pt-0">
                <div className="h-48 overflow-hidden rounded-lg">
                    <img
                        className="object-cover w-full h-full"
                        src={coverImage}
                        alt="Group of people working around a laptop"
                    />
                </div>
            </div>

            {/* Card Body (Title and Content) */}
            <div className="p-4">
                <h2 className="mb-2 text-xl font-bold text-gray-900">{title}</h2>
                <p className="mb-3 text-sm text-justify text-gray-600 line-clamp-3">{content}</p>
                <label className="text-sm font-semibold text-purple-500 transition duration-150 ease-in-out hover:text-purple-800">
                    Read More
                </label>
            </div>

        </div>
    )
}

export default BlogItem