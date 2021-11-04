import { useContext, useState, useEffect } from "react";
import { Avatar, Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const { Meta } = Card;

const Username = () => {
    const [state, setState] = useContext(UserContext);
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        if(router.query.username) {
            fetchUser();
        }
    }, [router.query.username]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/user/${router.query.username}`);
            setUser(data);
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <div className='row col-md-6 offset-md-3'>
            <div className="pt-5 pb-5">
                <Card hoverable cover={user.image ? (<img src={user.image.url} alt={user.name} />) : (<img src="/images/default.jpg" alt={user.name} />)}>
                    <Meta title={user.name} description={user.about} />

                    <p className="pt-2 text-muted">Joined {moment(user.createdAt).fromNow()}</p>

                    <div className="d-flex justify-content-between">
                        <span className="btn btn-sm">
                            {user.followers && user.followers.length} Followers
                        </span>
                        <span className="btn btn-sm">
                            {user.following && user.following.length} Followers
                        </span>
                    </div>
                </Card>

                <Link href='/user/dashboard'>
                    <a className="d-flex justify-content-center pt-5">
                        <RollbackOutlined />
                    </a>
                </Link>
            </div>
        </div>
    )
};

export default Username;