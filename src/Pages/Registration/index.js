import React, { useState } from 'react'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import './style.css'
import { useFormik } from 'formik';
import signUpValidation from '../../validation/validation';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { ScaleLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';

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
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    let [loading, setLoading] = useState(false)
    let auth = getAuth();

    const formik = useFormik({
        initialValues: initializeValue,
        validationSchema: signUpValidation,
        onSubmit: () => {
            setLoading(true);
            createUserWithEmailAndPassword(
                auth,
                formik.values.email,
                formik.values.password
            ).then(() => {
                formik.resetForm();
                setLoading(false)
                navigate('/login')
            }).catch(error => {
                if (error.code.includes('auth/email-already-in-use')) {
                    toast.error('Your Email Already Registered!', {
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
                setLoading(false)
            })
        }
    })

    const navigate = useNavigate()

    return (
        <React.Fragment>
            <Container fixed>
                <ToastContainer />
                    <Grid container spacing={2} className="registration-wrapper">
                        <Grid item xs={7}>
                            <h3>Get started with easily register</h3>
                            <h5>Free register and you can enjoy it</h5>
                            <div className='registration-innerLeft'>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        label="Your Name"
                                        variant="filled"
                                        className='TextFields'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.fullName}
                                        name='fullName'
                                    />
                                    {formik.errors.fullName && formik.touched.fullName ? (<h6 className='inputError'> {formik.errors.fullName}</h6>) : null}
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
                                    <TextField
                                        label="Confirm Password"
                                        variant="filled"
                                        className='TextFields'
                                        type={password}
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                        name='confirmPassword'
                                    />
                                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? (<h6 className='inputError'> {formik.errors.confirmPassword}</h6>) : null}
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
                                                Registration
                                            </Button>
                                        )
                                    }
                                    <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                                </form>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className='registration-innerRight'>
                                <picture>
                                    <img src="./images/Registration.png" alt="Registration" />
                                </picture>
                            </div>
                        </Grid>
                    </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Registration