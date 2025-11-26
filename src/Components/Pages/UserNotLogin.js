import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate, Link } from 'react-router-dom'

function UserNotLogin() {

    const history = useNavigate();
    return (

        <div className="flex flex-col items-center justify-center h-screen px-64 space-y-6 text-center">

            <div className="w-[800px] mx-auto">
                <DotLottieReact
                    src="https://lottie.host/34fc1384-c380-423c-ab78-e77632613610/5HqpweBpJW.lottie"
                    loop
                    autoplay

                />
            </div>

            <p className="text-2xl font-bold text-gray-700">
                Join Us & Discover More
            </p>
            <p className="text-gray-500">To access all our amazing articles, personalized content, and exclusive features, you need to be logged in. Please login or register to start exploring, saving your favorite posts, and enjoying a tailored blogging experience</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => history("/auth")}
                    className="px-6 py-2 text-white transition bg-purple-600 rounded-md hover:bg-purple-700"
                >
                    Login
                </button>
                <button
                    onClick={() => history("/auth")}
                    className="px-6 py-2 text-gray-700 transition bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default UserNotLogin
