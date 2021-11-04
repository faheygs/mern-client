import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import Link from "next/link";

const People = ({ people, handleFollow, handleUnfollow }) => {
    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    return (
        <>
            <List itemLayout="horizontal" dataSource={people} renderItem={(user) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={user.image ? (<Avatar src={user.image.url}></Avatar>) : (<Avatar>{user.username[0].toUpperCase()}</Avatar>)}
                        title={
                            <div className="d-flex justify-content-between">
                                <Link href={`/user/${user.username}`}>
                                    <a>
                                        {user.username}
                                    </a>
                                </Link>
                                {state && state.user && user.followers && user.followers.includes(state.user._id) ? (
                                    <span onClick={() => handleUnfollow(user)} className="text-primary pointer">Unfollow</span>
                                ) : (
                                    <span onClick={() => handleFollow(user)} className="text-primary pointer">Follow</span>
                                )}
                        </div>}
                    />
                </List.Item>
            )} />
        </>
    )
};

export default People;