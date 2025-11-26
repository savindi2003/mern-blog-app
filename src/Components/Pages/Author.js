import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from '../Nav/Nav'
import BlogListItem from '../BlogItem/BlogListItem'
import Footer from "../Nav/Footer";

function Author() {

    const {authorId} = useParams();
    const [author , setAuthor] = useState(null)
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useNavigate();

    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/author/${authorId}`);

                console.log(res)
                setAuthor(res.data.author);
                setBlogs(res.data.blogs);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorData();
    }, [authorId]);

    if (loading) {
        return <div className="mt-20 text-lg text-center">Loading...</div>;
    }

    

    return (
        <div className='min-h-screen bg-purple-50'>

            <div className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-white/60">
                <Nav />
            </div>


            <div className='w-2/3 mx-auto mt-24 '>

            <div className='w-10 h-10'></div>

                <div className="flex items-center p-4 mx-2 mb-10">

                   

                    {/* Author Avatar/Image */}
                    <div className="flex-shrink-0">
                        <img
                            className="object-cover w-20 h-20 rounded-full"
                            src={author?.profilePic}
                            alt={author?.username}
                        />
                    </div>

                    {/* Author Details */}
                    <div className="ml-3">
                        <p className="font-semibold text-gray-900 ">{author?.username}</p>
                        <p className="text-sm">{author?.bio}</p>
                    </div>

                </div>

                <div className="space-y-5">
                    {blogs.length === 0 ? (
                        <p className="text-center text-gray-600">No posts yet.</p>
                    ) : (
                        blogs.map((blog) => (
                            <BlogListItem key={blog._id} blog={blog} />
                        ))
                    )}
                </div>

            </div>
<Footer/>
        </div>
    )
}

export default Author
