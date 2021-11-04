import { useState, useContext } from 'react';
import { UserContext } from '../context';
import axios from 'axios';
import People from '../components/cards/People';
import { toast } from 'react-toastify';

const Search = () => {
    const [state, setState] = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    const searchUser = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.get(`/search-user/${query}`);
            setResult(data);
        } catch(e) {
            console.log(e);
        }
    }

    const handleFollow = async (user) => {
        try {
            const { data } = await axios.put('/user-follow', { _id: user._id });
            let auth = JSON.parse(localStorage.getItem('auth'));
            auth.user = data;
            localStorage.setItem('auth', JSON.stringify(auth));

            setState({...state, user: data});
            let filtered = result.filter((p) => (p._id !== user._id));
            setResult(filtered);
            toast.success(`Following ${user.name}`);
        } catch(e) {
            console.log(e);
        }
    };

    const handleUnfollow = async (user) => {
        try {
            const { data } = await axios.put('/user-unfollow', { _id: user._id });
            let auth = JSON.parse(localStorage.getItem('auth'));
            auth.user = data;
            localStorage.setItem('auth', JSON.stringify(auth));

            setState({...state, user: data});
            let filtered = result.filter((p) => (p._id !== user._id));
            setResult(filtered);
            toast.error(`Unfollowed ${user.name}`);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <form className="form-inline row" onSubmit={searchUser}>
                <div className="col-8">
                    <input 
                        className="form-control"
                        type="searct"
                        onChange={e => {
                            setQuery(e.target.value);
                            setResult([]);
                        }}
                        value={query}
                        placeholder="Search" />
                </div>
                <div className="col-4">
                    <button className="btn btn-outline-primary col-12" type="submit">Search</button>
                </div>
            </form>
            {result && result.map(r => <People key={r._id} people={result} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />)}
        </>
    )
};

export default Search;