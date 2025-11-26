import React, { useState, useEffect } from 'react'
import Nav from '../Nav/Nav'
import UpdateForm from '../UpdateForm/UpdateForm'
import BlogSmallListItem from '../BlogItem/BlogSmallListItem'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'
import Loading from './Loading';
import Footer from '../Nav/Footer';

function UpdateBlog() {

    const history = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [id, setId] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // JWT token from login
                if (!token) return;

                const res = await axios.get('http://localhost:5000/api/protected/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(res.data.user);
                setId(res.data.user.id)
                console.log(res.data.user.id);



            } catch (err) {
                console.error(err);
                alert("You are not authorized");
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/author/${id}`);

                console.log(res)
                setBlogs(res.data.blogs);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorData();
    }, [id]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
        <div className="flex items-center justify-center min-h-screen p-4 bg-purple-50">

            <div className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-white/60">
                <Nav />
            </div>

            {/* <UpdateForm/> */}

            <div className="min-h-screen p-6 mt-24 md:p-10 ">


                {/* Main Content Row: List (1/3) සහ Form (2/3) අඩංගු වේ */}
                <div className='flex flex-col gap-4 md:flex-row'>

                    {/* 1. ⬅️ Left Panel: Blog List (w-1/3) */}
                    <div className='w-full p-4 md:w-3/5 '>
                        <h2 className="pb-2 mb-4 text-2xl font-bold text-gray-700">All Posts</h2>


                        {loading ? (
                            // <div className="flex items-center justify-center py-10">
                            //     <div className="w-10 h-10 border-4 border-purple-400 rounded-full border-t-transparent animate-spin"></div>
                            // </div>
                            <Loading/>
                        ) : blogs.length === 0 ? (
                             <div className="flex items-center justify-center py-10">
                                <div className="w-10 h-10 border-4 border-purple-400 rounded-full border-t-transparent animate-spin"></div>
                            </div>
                            // <p className="text-center text-gray-600">No posts yet</p>
                        ) : (
                            blogs.map((blog) => (
                                <BlogSmallListItem
                                    key={blog._id}
                                    isSelected={selectedBlog?._id === blog._id}
                                    onClick={() => setSelectedBlog(blog)}
                                    blog={blog}
                                />
                            ))


                            
                        )}


                    </div>

                    {/* 2. ➡️ Right Panel: Update Form (w-2/3) */}
                    <div className='w-full md:w-2/3'>
                        {/* Blog Update Form Component (Static) */}

                        <UpdateForm blog={selectedBlog} />

                    </div>
                </div>
            </div>



        </div>
        <Footer/>
        </>
    )
}

export default UpdateBlog
