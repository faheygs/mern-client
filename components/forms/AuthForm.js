import { SyncOutlined } from '@ant-design/icons';

const AuthForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    secret,
    setSecret,
    loading,
    page,
    username,
    setUsername,
    about,
    setAbout,
    profileUpdate
}) => {

    return (
        <form onSubmit={handleSubmit}>
            
            {profileUpdate && (
                <div className='form-group p-2'>
                    <small>
                        <label className="text-muted">Username</label>
                    </small>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder="Enter Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                    />
                </div>
            )}
            {profileUpdate && (
                <div className='form-group p-2'>
                    <small>
                        <label className="text-muted">About</label>
                    </small>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder="Write about yourself"
                        value={about}
                        onChange={e => setAbout(e.target.value)} 
                    />
                </div>
            )}

            {page !== 'login' && (
                <div className='form-group p-2'>
                    <small>
                        <label className="text-muted">Your name</label>
                    </small>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                </div>
            )}
            <div className='form-group p-2'>
                <small>
                    <label className="text-muted">Email Address</label>
                </small>
                <input
                    disabled={profileUpdate}
                    type='email'
                    className='form-control'
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div className='form-group p-2'>
                <small>
                    <label className="text-muted">Password</label>
                </small>
                <input
                    type='password'
                    className='form-control'
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                />
            </div>

            {page !== 'login' && (
                <>
                    <div className='form-group p-2'>
                        <small>
                            <label className='text-muted'>Pick a question</label>
                        </small>
                        <select className='form-control'>
                            <option>What is your favorite color?</option>
                            <option>What is your best friend's name?</option>
                            <option>What is your favorite food?</option>
                        </select>
                        <small className="form-text text-muted">You can use this to reset your password if forgotten.</small>
                    </div>

                    <div className='form-group p-2'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Answer Here'
                            value={secret}
                            onChange={e => setSecret(e.target.value)} 
                        />
                    </div>
                </>
            )}

            <div className="form-group p-2">
                <button 
                    disabled={
                        profileUpdate ? loading :
                        page === 'login'
                            ? !email || !password || loading
                            : !name || !email || !password || !secret || loading
                        }
                    className='btn btn-primary'>
                    {loading ? <SyncOutlined spin className="py-1"/> : "Submit"}
                </button>
            </div>
        </form>
    )
}

export default AuthForm;