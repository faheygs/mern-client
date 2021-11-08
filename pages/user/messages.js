import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { Avatar } from 'antd';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection: true
});

const Messages = () => {
    const [state, setState] = useContext(UserContext);
    const [people, setPeople] = useState([]);
    const [chatUser, setChatUser] = useState();
    const [messages, setMessages] = useState();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const router = useRouter();

    useEffect(() => {
        socket.on('new-message', (newMessage) => {
            setMessages([newMessage, ...messages]);
            chatWindow();
        });
    }, []);

    useEffect(() => {
        if(state && state.token) {
            fetchPeople();
        }
    }, [state && state.token]);

    useEffect(() => {
        if(chatUser && chat && messages) {
            chatWindow();   
        }
    }, [chatUser && chat && messages]);

    const fetchPeople = async () => {
        try {
            const { data } = await axios.get('/users');
            setPeople(data);
        } catch(e) {
            console.log(e);
        }
    }

    const setChatUserId = async username => {
        try {
            const { data } = await axios.get(`/user/${username}`);
            setChatUser(data);
            setMessages(data.messages);
        } catch(e) {
            console.log(e);
        }
    };

    const sendMessage = async () => {
        
        try {
            const { data } = await axios.put(`/set-message`, {
                message,
                id: chatUser._id
            });
            if(data.error) {
                toast.error(data.error);
            } else {
                setMessage('');
                let auth = JSON.parse(localStorage.getItem('auth'));
                auth.user = data;
                localStorage.setItem('auth', JSON.stringify(auth));

                setState({ ...state, user: data });
                socket.emit('new-message', data.messages);
            }
        } catch(e) {
            console.log(e);
        }
    };

    const chatWindow = () => {
        console.log("Messages", messages);
        const tempChat = [];
        if(state && state.user && state.user.messages && messages) {
            state.user.messages.forEach(cm => {
                if(cm.sentTo == chatUser._id) {
                    tempChat.push({
                        id: cm._id,
                        user: state.user.name,
                        text: cm.text,
                        created: cm.created,
                        float: 'right'
                    });
                }
            });
            messages.forEach(m => {
                if(m.sentTo == state.user._id) {
                    tempChat.push({
                        id: m._id,
                        user: chatUser.name,
                        text: m.text,
                        created: m.created,
                        float: 'left'
                    });
                }
            });
            tempChat.sort((x, y) => {
                return new Date(y.created) - new Date(x.created);
            });
            console.log("Temp Chat",tempChat);
            setChat(tempChat);
        }
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='row py-5 text-light bg-default-image'>
                    <div className='col text-center'>
                        <h1>Messages</h1>
                    </div>
                </div>
            </div>
            
            {people && people.map(p => (
                <button key={p._id} onClick={() => setChatUserId(p.username)}>{p.name}</button>
            ))}

            <div className="container">
                <div className="chat">
                    {chatUser && chat && chat.map(m => (
                        <div key={m.id} className={m.float == 'right' ? 'bubble-right' : 'bubble-left'}>
                            <p><Avatar>{m.user[0].toUpperCase()}</Avatar>{m.text}</p>
                        </div>
                    ))}
                </div>
                <input onChange={e => setMessage(e.target.value)} type="text" placeholder="enter message" value={message}/>
                <button onClick={sendMessage}>Send</button>
            </div>

        </>
    )
};

export default Messages;