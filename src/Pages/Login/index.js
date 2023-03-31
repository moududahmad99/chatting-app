import React, { useState } from 'react'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { useFormik } from 'formik';

import { signInValidation } from '../../validation/validation';
// eslint-disable-next-line
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './style.css'

import { ScaleLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../Features/Slice/UserSlice';

const Login = () => {

    let [password, setpassword] = useState('password')
    let auth = getAuth();
    let [loading, setLoading] = useState(false)
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider()
    // const twitterProvider = new TwitterAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePassword = () => {
        if (password === 'password') {
            setpassword('text')
        } else {
            setpassword('password')
        }
    }

    const initializeValue = {
        email: '',
        password: '',
    }


    const formik = useFormik({
        initialValues: initializeValue,
        validationSchema: signInValidation,
        onSubmit: () => {
            setLoading(true);
            signInWithEmailAndPassword(
                auth,
                formik.values.email,
                formik.values.password
            ).then(({ user }) => {
                if (auth.currentUser.emailVerified === true) {
                    navigate('/');
                    dispatch(loginUser(user));
                    localStorage.setItem("users", JSON.stringify(user));
                    toast.success('Login Succses!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                setLoading(false);
                formik.resetForm();
                toast.error('Email Not Verified', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }).catch((error) => {
                setLoading(false)
                if (error.code.includes("auth/user-not-found")) {
                    toast.error('Invalid Email or Password', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                };
            });
        }
    });

    // Google Authentication
    const handleGoogleAuthentication = () => {
        signInWithPopup(auth, googleProvider).then(() => {
            navigate('/')
        })
    }

    // Facebook Authentication
    const handleFacebookAuthentication = () => {
        signInWithPopup(auth, facebookProvider).then(() => {
            navigate('/')
        })
    }

    // Twitter Authentication
    // const handleTwitterAuthentication = () => {
    //     signInWithPopup(auth, twitterProvider).then(() => {
    //         navigate('/')
    //     })
    // }

    // Github Authentication
    const handleGithubAuthentication = () => {
        signInWithPopup(auth, githubProvider).then(() => {
            navigate('/')
        })
    }

    return (
        <React.Fragment>
            <Container fixed>
                <ToastContainer />
                <Grid container spacing={2} className="login-wrapper">
                    <Grid item xs={6}>
                        <div className='login-innerLeft'>
                            <picture>
                                <img src="./images/Login.png" alt="Login" />
                            </picture>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='avator'>
                            <picture>
                                <img src="./images/avator.png" alt="avator" />
                            </picture>
                        </div>
                        <h3>Login To Your Account</h3>
                        <div className='authentication' >
                            <div className='googleAuth' onClick={handleGoogleAuthentication}>
                                <div className='authGoogle-logo'>
                                    <picture>
                                        <img src="./images/google-logo.svg" alt="google" />
                                    </picture>
                                </div>
                                <div className='authGoogle-text'>
                                    <h4>Google</h4>
                                </div>
                            </div>
                            <div className='facebookAuth' onClick={handleFacebookAuthentication}>
                                <div className='authFacebook-logo'>
                                    <picture>
                                        <img src="./images/facebook-logo.png" alt="facebook" />
                                    </picture>
                                </div>
                                <div className='authFacebook-text'>
                                    <h4>Facebook</h4>
                                </div>
                            </div>
                            {/* <div className='twitterAuth' onClick={handleTwitterAuthentication}>
                                <div className='authTwitter-logo'>
                                    <picture>
                                        <img src="./images/twitter-logo.png" alt="twitter" />
                                    </picture>
                                </div>
                                <div className='authTwitter-text'>
                                    <h4>Twitter</h4>
                                </div>
                            </div> */}
                            <div className='githubAuth' onClick={handleGithubAuthentication}>
                                <div className='authGithub-logo'>
                                    <picture>
                                        <img src="./images/github-logo.png" alt="github" />
                                    </picture>
                                </div>
                                <div className='authGithub-text'>
                                    <h4>Github</h4>
                                </div>
                            </div>
                        </div>
                        <div className='login-innerRight'>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    label="Email"
                                    variant="filled"
                                    className='TextFields'
                                    type='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    name="email"
                                />
                                {formik.errors.email && formik.touched.email ? (<h6 className='inputError'> {formik.errors.email}</h6>) : null}
                                <div className='password-inner'>
                                    <TextField
                                        label="Password"
                                        variant="filled"
                                        className='TextFields'
                                        type={password}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        name='password'
                                    />
                                    {formik.errors.password && formik.touched.password ? (<h6 className='inputError'> {formik.errors.password}</h6>) : null}
                                    <div className='password-eyeIcon'>
                                        {password === 'password' ? <AiFillEye onClick={handlePassword} className='eyeIcon' /> : <AiFillEyeInvisible onClick={handlePassword} className='eyeIcon' />}
                                    </div>
                                </div>
                                {
                                    loading ? (<Button
                                        variant="contained"
                                        type='submit'
                                        disabled
                                    >
                                        <ScaleLoader color="#36d7b7" />
                                    </Button>) : (
                                        <Button
                                            variant="contained"
                                            type='submit'
                                        >
                                            login
                                        </Button>
                                    )
                                }
                                <p>Not have an account? <Link to='/registration'>Sign Up</Link></p>
                                <p>Forgot Password?</p>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Login