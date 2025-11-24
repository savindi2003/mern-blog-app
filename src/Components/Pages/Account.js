import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import { BiPencil, BiListUl, BiBookmark } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom'


function Account() {
    const history = useNavigate();
    const [user, setUser] = useState(null);
    const [account, setAccount] = useState(null);
    const [id, setId] = useState("");

    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedBio, setUpdatedBio] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);


    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page
        history('/auth');
    }

   

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // JWT token from login
                if (!token) return;

                const res = await axios.get('http://localhost:5000/api/protected/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(res.data.user);
                console.log(res.data.user.id);
                setId(res.data.user.id);


            } catch (err) {
                console.error(err);
                alert("You are not authorized");
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (!id) return;  // Wait until ID is set

        const fetchAccountDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/auth/${id}`);
                setAccount(res.data.user);
                console.log(res.data.user)
            } catch (error) {
                console.log(error);
            } finally {

            }
        };

        fetchAccountDetails();
    }, [id]);

    //

    useEffect(() => {
        if (account) {

            setPreviewImage(account.profilePic);
            setUpdatedUsername(account.username);
            setUpdatedBio(account.bio);


            // existing image show
        }
    }, [account]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("username", updatedUsername);
        formData.append("bio", updatedBio);

        if (selectedFile) {
            formData.append("profilePic", selectedFile); // MUST match multer field name
        }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/auth/update/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Profile updated!");
            setAccount(res.data.user);
        } catch (error) {
            console.log(error);
            alert("Profile update failed");
        }finally {
        setIsUpdating(false);
    }


    }


    if (!user) return <p>Loading...</p>;

    if (!account) return <p className="mt-32 text-center">Loading...</p>;

    return (

        <div className='min-h-screen bg-purple-50'>

            {/* 🔝 Fixed Navigation Bar */}
            <div className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-white/60">
                <Nav />
            </div>

            <div className='max-w-6xl px-4 mx-auto mt-24'>

                <div className='w-10 h-10'></div>

                {/* Main Content Row: Profile Form එක සහ Menu Box එක අඩංගු වේ */}
                <div className='flex flex-col gap-8 md:flex-row'>

                    {/* 1️⃣ LEFT COLUMN: Profile Settings Form (පළලෙන් 2/3) */}
                    <div className='w-full md:w-3/4'>
                        <div className="p-8 bg-white shadow-2xl rounded-xl">
                            <h2 className="pb-2 mb-6 text-3xl font-bold text-gray-800 border-b">
                                Profile Settings
                            </h2>

                            <form>
                                {/* 🖼️ Profile Picture Update Section */}
                                <div className="flex items-center pb-6 mb-6 border-b border-gray-200">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="object-cover w-24 h-24 rounded-full shadow-md"
                                            src={previewImage}
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="ml-8">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Profile Photo</label>
                                        <input type="file"
                                            id="profile_pic"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0]
                                                setSelectedFile(file)

                                                const previewURL = URL.createObjectURL(file);
                                                setPreviewImage(previewURL);

                                            }}
                                        />
                                        <label
                                            htmlFor="profile_pic"
                                            className="inline-block px-4 py-2 text-sm font-semibold text-purple-600 transition duration-150 bg-indigo-100 rounded-lg cursor-pointer hover:bg-indigo-200"
                                        >
                                            Upload New Photo
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500">JPG, PNG (Max 5MB)</p>
                                    </div>
                                </div>

                                {/* 👤 Username Field */}
                                <div className="mb-6">
                                    <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={updatedUsername}
                                        onChange={(e)=> setUpdatedUsername(e.target.value)}
                                        className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter your new username"
                                    />
                                </div>

                                {/* 📧 Email Field */}
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={account.email}
                                        className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {/* 📝 Bio Field (Textarea) */}
                                <div className="mb-8">
                                    <label htmlFor="bio" className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        id="bio"
                                        rows="3"
                                        value={updatedBio}
                                        onChange={(e)=> setUpdatedBio(e.target.value)}
                                        className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Tell us a little about yourself..."
                                    ></textarea>
                                    <p className="mt-1 text-xs text-gray-500">Short description for your profile (max 160 characters).</p>
                                </div>

                                {/* 💾 Save Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-semibold text-white transition duration-150 bg-purple-500 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={handleUpdate}
                                        disabled={isUpdating}
                                    >

                                      {isUpdating ? (
                                        <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>

                                      ) : "Update Profile" } 

                                        
                                    </button>

                                    <button
                                        type="submit"
                                        onClick={handleLogout}
                                        className="px-6 py-2 mx-3 font-semibold text-white transition duration-150 bg-pink-500 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Log out
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                    {/* 1️⃣ LEFT COLUMN END */}


                    {/* 2️⃣ RIGHT COLUMN: Menu / Actions Section (පළලෙන් 1/3) */}
                    <div className='w-full md:w-1/4'>
                        {/* ⚙️ Menu Box - දම් පැහැති Box එක */}
                        {/* Box එකේ පළල සම්පූර්ණ column එකට (w-full) සකසා ඇත */}
                        <div className='w-full p-2 font-semibold bg-purple-600 divide-y shadow-2xl rounded-xl divide-purple-400/50'>

                            {/* Create Item */}

<Link to="/new">
                            <div className="flex items-center justify-between p-3 text-white transition duration-150 ease-in-out cursor-pointer rounded-t-xl hover:bg-purple-700">
                                <div className="flex items-center gap-4">
                                    <BiPencil className="text-lg" />
                                    <span className="m-0">Create</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            </Link>

                            <Link to="/update">
                            <div className="flex items-center justify-between p-3 text-white transition duration-150 ease-in-out cursor-pointer hover:bg-purple-700">
                                <div className="flex items-center gap-4">
                                    <BiListUl className="text-lg" />
                                    <span className="m-0">Posts</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            </Link>

                            {/* Saved Item */}
                            <div className="flex items-center justify-between p-3 text-white transition duration-150 ease-in-out cursor-pointer rounded-b-xl hover:bg-purple-700">
                                <div className="flex items-center gap-4">
                                    <BiBookmark className="text-lg" />
                                    <span className="m-0">Saved</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* 2️⃣ RIGHT COLUMN END */}

                </div>
            </div>
        </div>
    )
}

export default Account