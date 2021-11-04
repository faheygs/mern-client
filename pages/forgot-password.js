import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import Link from 'next/link';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import { UserContext } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post('/forgot-password', {
                email,
                newPassword,
                secret
            });
            console.log('DATA -> ', data);

            if(data.error) {
                toast.error(data.error);
                setLoading(false);
            }

            if(data.success) {
                setEmail("");
                setNewPassword("");
                setSecret("");
                setOk(true);
                setLoading(false);
            }
        } catch(e) {
            console.log(e);
            setLoading(false);
        }
        
    };

    if(state && state.token) router.push('/');

    return (
        <div className='container-fluid'>
            <div className='row py-5 text-light bg-default-image'>
                <div className='col text-center'>
                    <h1>Forgot Password</h1>
                </div>
            </div>

            <div className='row py-5'>
                <div className='col-md-6 offset-md-3'>
                    <ForgotPasswordForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal
                        title="Congratulations"
                        visible={ok}
                        onCancel={() => setOk(false)}
                        footer={null}
                    >
                        <p>Congrats! You can now login with your new password.</p>
                        <Link href='/login'>
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;