import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import SearchBar from '../SearchBar/SearchBar' // Assuming this is imported elsewhere
import BlogItem from '../BlogItem/BlogItem' // Assuming this is imported elsewhere
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const URL = "http://localhost:5000/api/posts";

function Home() {

  const history = useNavigate();

  const [blogs, setBlogs] = useState([])

  // ⭐️ MOCK USER ID: Replace this with your actual authenticated user's ID
  // For demonstration, I'm using an ID that exists in your sample 'likes' array: "691cb438a305bae6e5f1114f"
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT token from login
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/protected/create', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCurrentUserId(res.data.user.id);
      } catch (err) {
        console.error(err);
        alert("You are not authorized");
      }
    };

    fetchProfile();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(URL)
    setBlogs(res.data.blogs);
    return res.data.blogs
  }

  useEffect(() => {
    fetchData();
  }, [])

  // ⭐️ 1. Centralized Function to Update Likes in the Main List
  const handleListLikeUpdate = (blogId, updatedLikesArray) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog._id === blogId
          ? { ...blog, likes: updatedLikesArray } // Update the likes array for the specific blog
          : blog // Keep other blogs unchanged
      )
    );
  };


  // Search/Filter State and Logic (Unchanged)
  const [searchQuery, setSearchQuery] = useState("")
  const [noResults, setNoResults] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Education', 'Travel', 'Lifestyle', 'Business'];

  const handleSearch = async (e) => {
    // e.preventDefault();

    const allBlogs = await fetchData();

    const q = searchQuery.toLowerCase();

    const filteredBlogs = allBlogs.filter((blog) => {
      const matchText =
        blog.title.toLowerCase().includes(q) ||
        blog.content.toLowerCase().includes(q) ||
        blog.author.username.toLowerCase().includes(q);

      const matchCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchText && matchCategory;
    });

    setBlogs(filteredBlogs);
    setNoResults(filteredBlogs.length === 0);
  };

  useEffect(() => {
    // trigger search filtering when category changes
    handleSearch({ preventDefault: () => { } });
  }, [selectedCategory, searchQuery]); // Added searchQuery dependency

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="min-h-screen bg-purple-50">

      {/* Fixed + Blur Navbar */}
      <div className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-white/60">
        <Nav />
      </div>

      {/* Content below navbar */}
      <div className="mt-20">

        <div className='w-screen h-8'></div>

        <div className='w-1/3 mx-auto mt-5 justify-self-center'>
          <form
            className="flex items-center w-full max-w-lg overflow-visible bg-white border border-gray-200 rounded-full shadow-lg" // NOTE: Changed to overflow-visible to show the list
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          >

            {/* Category Selector */}
            <div className="relative z-10"> {/* z-index ensures the dropdown list is on top */}

              <button
                type="button"
                className="flex items-center justify-between w-full px-8 py-2 text-gray-700 transition duration-150 border-r border-gray-200 cursor-pointer focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <span>{selectedCategory}</span>

                <svg
                  className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Options List (The custom dropdown menu) */}
              {isOpen && (
                <ul
                  className="absolute left-0 w-48 mt-2 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl"
                  role="listbox"
                >
                  {categories.map((category) => (
                    <li
                      key={category}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-100 hover:text-purple-700 transition duration-100 ${selectedCategory === category ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-700'}`}
                      onClick={() => handleCategorySelect(category)}
                      role="option"
                      aria-selected={selectedCategory === category}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Input (No changes needed here) */}
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-4 py-2 border-none focus:outline-none focus:ring-0"
            />

            {/* Search Icon Button (No changes needed here) */}
            <button
              type="submit"
              className="flex-shrink-0 p-3 m-1 text-white transition duration-150 ease-in-out bg-purple-600 rounded-full hover:bg-purple-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

          </form>
        </div>

        <div className="container px-4 py-8 mx-auto">
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>

            {noResults ? (
              <div>
                No Results
              </div>
            ) : (
              <>
                {blogs && blogs.map((blog, i) => (
                  <div key={i}
                    onClick={() => history(`/blog/${blog._id}`)}
                    className="cursor-pointer"
                  >
                    {/* ⭐️ 2. Pass currentUserId and onLikeUpdate function as props */}
                    <BlogItem
                      blog={blog}
                      currentUserId={currentUserId}
                      onLikeUpdate={handleListLikeUpdate}
                    />
                  </div>
                ))}
              </>
            )}


          </div>
        </div>
      </div>

    </div>
  )
}

export default Home