import React from 'react'

function Comment({comments}) {

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (

        <>
            {comments.map((comment, index) => (
                <div key={index} className="p-5 mx-10 mt-2 bg-white border shadow-sm rounded-xl">

                    <div className="flex items-center mb-3">
                        <img
                            className="w-10 h-10 rounded-full"
                            src={comment?.userId?.profilePic || "https://via.placeholder.com/40"}
                            alt=""
                        />

                        <div className="ml-3">
                            <p className="font-semibold">
                                {comment?.userId?.username || "Unknown User"}
                            </p>
                            <p className="text-xs text-gray-400">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <p>{comment.content}</p>
                </div>
            ))}
        </>

    )
}

export default Comment
