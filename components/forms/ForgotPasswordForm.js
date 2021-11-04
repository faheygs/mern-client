import { SyncOutlined } from '@ant-design/icons';

const ForgotPasswordForm = ({
    handleSubmit,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    secret,
    setSecret,
    loading,
    page
}) => {

    return (
        <form onSubmit={handleSubmit}>                
            <div className='form-group p-2'>
                <small>
                    <label className="text-muted">Email Address</label>
                </small>
                <input
                    type='email'
                    className='form-control'
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div className='form-group p-2'>
                <small>
                    <label className="text-muted">New Password</label>
                </small>
                <input
                    type='password'
                    className='form-control'
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} 
                />
            </div>

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

            <div className="form-group p-2">
                <button 
                    disabled={!email || !newPassword || !secret || loading}
                    className='btn btn-primary'>
                    {loading ? <SyncOutlined spin className="py-1"/> : "Submit"}
                </button>
            </div>
        </form>
    )
}

export default ForgotPasswordForm;