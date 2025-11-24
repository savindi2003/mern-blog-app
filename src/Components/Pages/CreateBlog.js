import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function CreateBlog() {

    const [user, setUser] = useState(null);  //loged user
    const [coverImage, setCoverImage] = useState(null);     // Base64 image
    const [previewImage, setPreview] = useState(null);           // Preview URL
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useNavigate();

    //Image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setPreview(URL.createObjectURL(file))

            setCoverImage(file);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!coverImage) {
            alert("Please upload a cover image!");
            return;
        }

        setLoading(true)

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("author", user.id);
            formData.append("category", category);
            formData.append("tags", tags.split(",").map(t => t.trim()));
            formData.append("coverImage", coverImage); // File object

            const response = await axios.post(
                "http://localhost:5000/api/posts",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );


            alert("Blog posted successfully!");
            console.log(response.data);
            

        } catch (error) {
            console.log(error);
            alert("Error creating blog!");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // JWT token from login
                if (!token) return;

                const res = await axios.get('http://localhost:5000/api/protected/create', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(res.data.user);
            } catch (err) {
                console.error(err);
                alert("You are not authorized");
            }
        };

        fetchProfile();
    }, []);
    if (!user) return <p>Loading...</p>;

    return (
        // 💾 පිටතම Container එක
        <div className="flex items-center justify-center min-h-screen p-4 bg-purple-50">

            <div className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-white/60">
                <Nav />
            </div>



            {/* 📝 ෆෝම් කාඩ් එක */}
            <div className="w-full max-w-3xl p-8 mt-24 bg-white shadow-2xl rounded-xl">
                <h2 className="pb-2 mb-6 text-3xl font-bold text-gray-800 border-b">
                    Create New Blog Post
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* 1. 🖼️ Cover Image Field */}
                    <div className="pb-6 mb-6 border-b border-gray-200">
                        <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-700">
                            Cover Image
                        </label>

                        {/* Hidden Input */}
                        <input
                            type="file"
                            id="coverImage"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        {/* Upload Box */}
                        <label
                            htmlFor="coverImage"
                            className="relative flex items-center justify-center w-full p-4 transition border-2 border-purple-400 border-dashed rounded-lg cursor-pointer h-60 hover:bg-purple-50"
                        >
                            {/* IF IMAGE SELECTED → SHOW PREVIEW */}
                            {previewImage ? (
                                <>
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="object-cover w-full h-full rounded-lg"
                                    />

                                    <span className="absolute px-4 py-2 text-xs font-semibold rounded-lg bg-white/30 backdrop-blur-sm">
                                        Re-Upload Cover Image (Max 5MB)
                                    </span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className="font-medium text-purple-700">Upload Cover Image (Max 5MB)</span>
                                </>
                            )}
                        </label>
                    </div>


                    {/* 2. 📰 Title Field */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="e.g., Top 10 Travel Destinations in Sri Lanka"
                            className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* 3. 📝 Content Field (Textarea) */}
                    <div className="mb-6">
                        <label htmlFor="content" className="block mb-1 text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows="8"
                            placeholder="Start writing your blog post content here..."
                            className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    {/* 4. 🏷️ Category and Tags (Two Columns) */}
                    <div className="flex flex-col gap-6 mb-8 md:flex-row">

                        {/* Category Field */}
                        <div className="w-full md:w-1/2">
                            <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="" disabled>Select a Category</option>
                                <option value="Travel">Travel</option>
                                <option value="Technology">Technology</option>
                                <option value="Food">Food</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>

                        {/* Tags Field (Multiple Inputs or Text Input) */}
                        <div className="w-full md:w-1/2">
                            <label htmlFor="tags" className="block mb-1 text-sm font-medium text-gray-700">
                                Tags (Enter comma separated values)
                            </label>
                            <input
                                type="text"
                                id="tags"
                                placeholder="e.g., Beach, Culture, Mountains, Asia"
                                className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 5. ✨ Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 font-semibold text-white transition duration-150 bg-purple-500 shadow-md rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            disabled={loading}
                        >

                            {loading ? (
                                <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            ) : null}
                            {loading ? "" : "Publish"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBlog;