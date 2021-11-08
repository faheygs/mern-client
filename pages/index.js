import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import Post from "../components/cards/Post";
import Head from 'next/head';
import io from 'socket.io-client';

// const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
//     reconnection: true
// });

const Home = () => {
    const [state, setState] = useContext(UserContext);
    const [newsFeed, setNewsFeed] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();
        // socket.on('new-post', (newPost) => {
        //     setNewsFeed([newPost, ...posts]);
        // });
    }, []);

    const loadPosts = async () => {
        const { data } = await axios.get('/posts');
        setPosts(data);
    };

    const head = () => {
        <Head>
            <title>MERNCAMP - A Social Network</title>
            <meta name="description" content="A social network that I am making" />
            <meta property="og:description" content="A social network that I am making" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="MERNCAMP" />
            <meta property="og:url" content="http://merncamp.com" />
            <meta property="og:image:secure_url" content="http://merncamp.com/images/default.jpg" />
        </Head>
    };

    const collection = newsFeed.length > 0 ? newsFeed : posts;

    return (
        <>
            {head()}
            <ParallaxBG url="/images/default.jpg" />
            <div className="container">
                <div className="row pt-5">
                    {collection.map(post => (
                        <div key={post._id} className="col-md-4">
                            <Post post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Home;