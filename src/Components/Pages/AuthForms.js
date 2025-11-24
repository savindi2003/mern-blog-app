import React, { useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


function AuthForms() {

    const history = useNavigate();

    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const themeColor = 'indigo';

    //normal sign up
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const username = document.getElementById("reg-username").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("reg-confirm-password").value;
        const bio = document.getElementById("reg-bio").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password,
                bio
            });

            alert(res.data.message); // Registered successfully
            setIsRegistering(false);

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed!");
        } finally {
            setIsLoading(false); // stop loading
        }

    }

    //normal sign in
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem('token', res.data.token);
            alert("Logged in successfully");
            history('/account');
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false); // stop loading
        }
    };


    const renderRegisterForm = () => (
        <>
            <h2 className={`mb-6 text-3xl font-bold text-gray-800 border-b-2 border-${themeColor}-400 pb-2`}>
                Create Account
            </h2>

            <form className="space-y-4" onSubmit={handleRegister}>
                {/* Username */}
                <div>
                    <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="reg-username"
                        placeholder="Choose a username"
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-100`}
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="reg-email"
                        placeholder="your@email.com"
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-100`}
                    />
                </div>

                {/* Password (1) */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="reg-password"
                            placeholder="Enter password"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-100`}
                        />
                    </div>
                    {/* Password (2) - Confirm */}
                    <div className="w-1/2">
                        <label htmlFor="reg-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="reg-confirm-password"
                            placeholder="Re-enter password"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-100`}
                        />
                    </div>
                </div>

                {/* Bio (Textarea) */}
                <div>
                    <label htmlFor="reg-bio" className="block text-sm font-medium text-gray-700">Bio (Optional)</label>
                    <textarea
                        id="reg-bio"
                        rows="2"
                        placeholder="Tell us about yourself..."
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-100`}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full px-4 py-3 text-white font-semibold bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition duration-150 flex items-center justify-center`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    ) : null}
                    {isLoading ? "" : "Sign Up"}
                </button>

                <div className="mt-4">
                    <GoogleLogin
                        onSuccess={async (response) => {
                            const result = await axios.post("http://localhost:5000/api/auth/google", {
                                token: response.credential
                            });
                            console.log(result.data);
                            setIsRegistering(false);
                        }}
                        onError={() => {
                            console.log("Google Login Failed");
                        }}
                    />
                </div>


            </form>
        </>
    );

    // ----------------------------------------------------------------------
    // ➡️ 2. Sign In Form
    // ----------------------------------------------------------------------
    const renderSignInForm = () => (
        <>
            <h2 className={`mb-6 text-3xl font-bold text-gray-800 border-b-2 border-${themeColor}-400 pb-2`}>
                Sign In
            </h2>

            <form className="space-y-6" onSubmit={handleLogin}>
                {/* Email or Username */}
                <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email or Username</label>
                    <input
                        type="text"
                        id="login-email"
                        placeholder="Enter email or username"
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-100`}
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        placeholder="Enter password"
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-100`}
                    />
                    <p className={`mt-1 text-xs text-right text-purple-600 cursor-pointer hover:underline font-semibold`}>Forgot Password?</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full px-4 py-3 text-white font-semibold bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition duration-150 flex items-center justify-center`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    ) : null}
                    {isLoading ? "" : "Sign In"}
                </button>

                <div className="mt-4">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            try {
                                const res = await axios.post("http://localhost:5000/api/auth/google", {
                                    token: credentialResponse.credential
                                });

                                // Save JWT
                                localStorage.setItem("token", res.data.token);

                                alert(`Logged in as ${res.data.user.username}`);
                                
                                // Optionally redirect
                                history('/account');
                            } catch (err) {
                                console.error(err);
                                alert("Google login failed");
                            }
                        }}
                        onError={() => {
                            console.log("Google Login Failed");
                        }}
                    />

                </div>

            </form>
        </>
    );




    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-purple-50">

            <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">

                {/* 1. Form Content (Transition Enabled) */}
                <div
                    key={isRegistering ? 'register' : 'signin'} // Transition යෙදීම සඳහා key වෙනස් කරයි
                    className="transition-opacity duration-300 ease-in-out"
                >
                    {isRegistering ? renderRegisterForm() : renderSignInForm()}
                </div>

                {/* 2. Switch Toggle */}
                <div className={`mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-600`}>
                    {isRegistering ? (
                        <>
                            Already have an account?{' '}
                            <span
                                onClick={() => setIsRegistering(false)}
                                className={`font-semibold text-purple-600 cursor-pointer hover:text-purple-700`}
                            >
                                Sign In
                            </span>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <span
                                onClick={() => setIsRegistering(true)}
                                className={`font-semibold text-purple-600 cursor-pointer hover:text-purple-700`}
                            >
                                Sign Up
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthForms;