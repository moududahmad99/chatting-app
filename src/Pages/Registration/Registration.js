import React, { useState } from 'react'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import './Registration.css'

const Registration = () => {

    let [password, setpassword] = useState('password')

    const handlePassword = () => {
        if (password === 'password') {
            setpassword('text')
        } else {
            setpassword('password')
        }
    }


    return (
        <React.Fragment>
            <Container fixed>
                <Grid container spacing={2} className="registration-wrapper">
                    <Grid item xs={7}>
                        <h3>Get started with easily register</h3>
                        <h5>Free register and you can enjoy it</h5>
                        <div className='registration-innerLeft'>
                            <TextField
                                label="Your Name"
                                variant="filled"
                                className='TextFields'
                                type='text'
                            />
                            <TextField
                                label="Email"
                                variant="filled"
                                className='TextFields'
                                type='email'
                            />
                            <div className='password-inner'>
                                <TextField
                                    label="Password"
                                    variant="filled"
                                    className='TextFields'
                                    type={password}
                                />
                                <div className='password-eyeIcon'>
                                    {password === 'password' ? <AiFillEye onClick={handlePassword} className='eyeIcon'/> : <AiFillEyeInvisible onClick={handlePassword} className='eyeIcon'/>}
                                </div>
                            </div>
                            <TextField
                                label="Confirm Password"
                                variant="filled"
                                className='TextFields'
                                type='password'
                            />
                            <Button variant="contained">Registration</Button>

                            <a href>Already have an account? <span>Sign In</span></a>
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