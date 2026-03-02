import './forgotPass.css'
import ProjectLogo from "../../assets/images/proj-logo.png";
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const ForgotPass = () => {

    const [email, setEmail] = useState('')
    // const navigate =useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div id="back-page">
            <img src={ProjectLogo} className="p-3" alt="logo" width={100} />
            <form onSubmit={handleSubmit} className="new-pass-form container mx-auto my-4 p-4 rounded w-50 bg-white d-flex flex-column ">
                <h2>Forgot Password?</h2>
                <small>
                    Don't worry! it occurs. please enter the email address linked with your account.
                </small>

                <div className="form-floating mt-3 mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <button
                    type="submit"
                    className="rounded text-danger bg-black p-3 w-100"
                    onClick={handleSubmit}
                >
                    Send Code
                </button>
                <div className="pt-5">
                    <p className="text-center">
                        Remember Password?{" "}
                        <a className="text-decoration-none " href="/login">
                            <bold className="text-danger">Login Now</bold>
                        </a>
                    </p>
                </div>
            </form>

        </div>
    )
}

export default ForgotPass