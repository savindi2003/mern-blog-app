
import Nav from '../Nav/Nav'
import Tags from '../BlogItem/Tags'
import Comment from '../BlogItem/Comment'
import BlogItem from '../BlogItem/BlogItem'
import BlogSmallItem from '../BlogItem/BlogSmallItem'
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function SingleView() {

    const [user, setUser] = useState(null);  //loged user
    const { id } = useParams();   //post id
    const [blog, setBlog] = useState(null);

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        if (blog && user) {
            setLiked(blog.likes.includes(user.id));
        }
        if (blog) {
            setLikesCount(blog.likes.length);
        }
    }, [blog, user]);


    const handleLike = async () => {
        if (!user) {
            alert("Please login to like posts");
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/posts/${id}/like`,
                { userId: user.id }
            );

            setLiked(prev => !prev);
            setLikesCount(res.data.likesCount);

        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        const fetchBlog = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
            setBlog(res.data.blogs);

        }
        fetchBlog();
    }, [id]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // JWT token from login
                if (!token) return;

                const res = await axios.get('http://localhost:5000/api/protected/comment', {
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

    //

    //send request
    const handleSubmit = async (e) => {
        e.preventDefault();

        const postId = id;
        const content = document.getElementById("comment-text").value;
        const userId = user.id;  // backend එකේ user._id කියලා එනවා නම්

        if (!content.trim()) {
            alert("Comment cannot be empty");
            return;
        }

        try {
            const res = await axios.post(
                `http://localhost:5000/api/comment/${postId}/comment`,
                { userId, content }
            );

            console.log(res)

            // optional: comment publish උනාට පස්සේ clear කරන්න
            document.getElementById("comment-text").value = "";

            // optional: UI refresh
            setBlog(prev => ({
                ...prev,
                comments: [...prev.comments, res.data.comment]
            }));

        } catch (error) {
            console.log(error);
            alert("Failed to post comment");
        }
    };

    //also like
    useEffect(() => {
    const fetchRelatedBlogs = async () => {
        if (!blog) return;
        try {
            const res = await axios.get(`http://localhost:5000/api/posts/related/${blog._id}`);
            setRelatedBlogs(res.data.blogs);
        } catch (err) {
            console.error(err);
        }
    };

    fetchRelatedBlogs();
}, [blog]);


    if (!blog) return <div>Loading...</div>;

    return (
        <div className='min-h-screen bg-purple-50'>
            <div className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-white/60">
                <Nav />
            </div>

            <div className='w-2/3 mx-auto mt-24 '>

                <div className="flex items-center justify-between p-4 mx-2">

                    {/* LEFT SIDE - AUTHOR */}
                    <div className="flex items-center">
                        <Link to={`/author/${blog.author._id}`} className="flex items-center">
                            <img
                                className="object-cover w-10 h-10 rounded-full"
                                src={blog.author.profilePic}
                                alt={blog.author.username}
                            />

                            <div className="ml-3">
                                <p className="text-sm font-semibold text-gray-900">{blog.author.username}</p>
                                <p className="text-xs text-purple-400">{formatDate(blog.updatedAt)}</p>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT SIDE - LIKE BUTTON */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleLike}>

                        {/* ICON */}
                        {liked ? (
                            <svg
                                className="w-5 h-5 text-red-500 transition duration-200 ease-in-out hover:scale-110"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                            </svg>
                        ) : (
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
                        )}

                        {/* LIKE COUNT */}
                        <span className="text-sm text-gray-700">{likesCount}</span>
                    </div>
                </div>

                <img
                    className="object-cover w-full h-96 rounded-xl"
                    src={blog.coverImage}
                    alt="Group of people working around a laptop"
                />

                <div className='mx-10 my-5'>
                    <p className='mx-10 text-4xl font-bold'>{blog.title}</p>

                    <div className='mx-10 my-2 mt-4'>

                        <Tags tags={blog.tags} />

                    </div>

                    <p className='mx-10 mt-4 leading-7'>{blog.content}</p>
                </div>

                <div className='mx-10 my-10 '>

                    <p className='mx-10 text-2xl font-semibold'>Comments</p>

                    <Comment comments={blog.comments} />


                </div>

                <div className='mx-10'>
                    <div className='mx-10 '>
                        <p className='text-xs font-bold text-purple-700'>Leave a Comment</p>


                        <textarea
                            rows="3"
                            id='comment-text'
                            placeholder="Write your comment..."
                            className="w-full p-3 mt-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        ></textarea>

                        <div className="flex justify-end mt-2">
                            <button
                                className={`px-4 py-1.5 text-sm rounded-full transition 
        ${user
                                        ? "bg-purple-500 text-white hover:bg-purple-700"
                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    }`}
                                onClick={user ? handleSubmit : () => alert("Please login to comment")}
                            >
                                {user ? "Post" : "Login to Comment"}
                            </button>

                        </div>

                    </div>
                </div>

                <div className='mx-10 mt-5'>
                    <div className='mx-10'>

                        <p className=''>You Might Also Like</p>

                        <div className="flex justify-center ... mt-4">
                           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {relatedBlogs.length === 0 ? (
            <p className="text-gray-500 col-span-full">No suggestions yet.</p>
        ) : (
            relatedBlogs.map(blog => (
                <BlogSmallItem key={blog._id} blog={blog} />
            ))
        )}
    </div>
                        </div>

                    </div>
                </div>




            </div>

        </div>
    )
}

export default SingleView
