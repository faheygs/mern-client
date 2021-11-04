import { useContext, useState, useEffect } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const Following = () => {
    const [state, setState] = useContext(UserContext);
    const [people, setPeople] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if(state && state.token) {
            fetchFollowing();
        }
    }, [state && state.token]);

    const fetchFollowing = async () => {
        try {
            const { data } = await axios.get('/user-following');
            setPeople(data);
        } catch(e) {
            console.log(e);
        }
    }

    const handleUnfollow = async (user) => {
        try {
            const { data } = await axios.put('/user-unfollow', { _id: user._id });
            let auth = JSON.parse(localStorage.getItem('auth'));
            auth.user = data;
            localStorage.setItem('auth', JSON.stringify(auth));

            setState({...state, user: data});
            let filtered = people.filter((p) => (p._id !== user._id));
            setPeople(filtered);
            toast.error(`Unfollowed ${user.name}`);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className='row col-md-6 offset-md-3'>
            <List itemLayout="horizontal" dataSource={people} renderItem={(user) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={user.image ? (<Avatar src={user.image.url}></Avatar>) : (<Avatar>{user.username[0].toUpperCase()}</Avatar>)}
                        title={<div className="d-flex justify-content-between">{user.username} <span onClick={() => handleUnfollow(user)} className="text-primary pointer">Unfollow</span></div>}
                    />
                </List.Item>
            )} />
            <Link href='/user/dashboard'>
                <a className="d-flex justify-content-center pt-5">
                    <RollbackOutlined />
                </a>
            </Link>
        </div>
    )
};

export default Following;