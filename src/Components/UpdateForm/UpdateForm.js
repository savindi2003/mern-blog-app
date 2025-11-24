import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function UpdateForm({ blog }) {

    const history = useNavigate();

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (blog) {
            setId(blog._id)
            setTitle(blog.title);
            setContent(blog.content);
            setCategory(blog.category || '');
            const tagsString = Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || '');
            setTags(tagsString);

            // Set the existing cover image URL for preview
            setPreviewImage(blog.coverImage || '');
            setCoverImage(null); // reset file input
        }
    }, [blog]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            // Revert to the existing image URL if the new file selection is cancelled
            setPreviewImage(blog?.coverImageUrl || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('tags', tags); // backend will split
            if (coverImage) {
                formData.append('coverImage', coverImage);
            }

            const response = await axios.put(`http://localhost:5000/api/posts/${id}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            console.log('Blog updated:', response.data);
            alert('Blog updated successfully!');

        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update blog.');
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/posts/${id}`);
        alert("Blog deleted successfully!");
        history('/update')
        // Optional: redirect or update parent component state
    } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete blog.");
    } finally {
        setLoading(false);
    }
};

    return (
        <div>
            <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
                <h2 className="pb-2 mb-6 text-3xl font-bold text-gray-800 border-b">
                    Update Blog Post
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* 1. 🖼️ Cover Image Field */}
                    <div className="pb-6 mb-6 border-b border-gray-200">
                        <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-700">
                            Cover Image
                        </label>

                        <label
                            htmlFor="coverImage"
                            className={`relative flex items-center justify-center w-full h-40 p-4 text-purple-600 transition duration-150 border-2 border-purple-400 border-dashed rounded-xl cursor-pointer
                            ${previewImage ? 'bg-cover bg-center' : 'hover:bg-indigo-50'}`}
                            style={previewImage ? {
                                backgroundImage: `url(${previewImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            } : {}}
                        >
                            <input
                                type="file"
                                id="coverImage"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            {/* Overlay for re-upload button */}
                            {previewImage ? (
                                <span className="absolute inset-0 flex items-center justify-center font-bold text-white transition-opacity duration-300 bg-black opacity-0 bg-opacity-40 rounded-xl hover:opacity-100">
                                    Re-upload Cover Image
                                </span>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className="mt-2 text-sm font-medium">Upload Cover Image (Max 5MB)</span>
                                </div>
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Top 10 Travel Destinations in Sri Lanka"
                            className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing your blog post content here..."
                            className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="e.g., Beach, Culture, Mountains, Asia"
                                className="w-full px-4 py-2 transition duration-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* 5. ✨ Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 mr-2 font-semibold text-white transition duration-150 bg-red-500 shadow-md rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={handleDelete}
                        >
                            Delete Post
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 font-semibold text-white transition duration-150 bg-purple-500 shadow-md rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            {loading ? 'Updating...' : 'Update Blog'}
                        </button>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateForm
