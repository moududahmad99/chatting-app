import React, { useState } from 'react'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { useFormik } from 'formik';

import { signInValidation } from '../../validation/validation';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './style.css'

import { ScaleLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const Registration = () => {

    let [password, setpassword] = useState('password')

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

    let [loading, setLoading] = useState(false)
    let auth = getAuth();

    const formik = useFormik({
        initialValues: initializeValue,
        validationSchema: signInValidation,
        onSubmit: () => {
            setLoading(true);
            signInWithEmailAndPassword(
                auth,
                formik.values.email,
                formik.values.password
            ).then(() => {
                setLoading(false)
                formik.resetForm();
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
                }
            })
        }
    })


    return (
        <React.Fragment>
            <Container fixed>
                <ToastContainer />
                <Grid container spacing={2} className="login-wrapper">
                    <Grid item xs={7}>
                        <div className='login-innerLeft'>
                            <picture>
                                <img src="./images/Login.png" alt="Login" />
                            </picture>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className='avator'>
                            <picture>
                                <img src="./images/avator.png" alt="avator" />
                            </picture>
                        </div>
                        <h3>Login To Your Account</h3>
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

export default Registration