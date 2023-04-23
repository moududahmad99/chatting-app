import React from 'react'
import './style.css'
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
// import { signInValidation } from '../../validation/validation';
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";


const ForgotPassword = () => {

	const auth = getAuth();

	const initializeValue = {
        email: '',
    }

	const formik = useFormik({
        initialValues: initializeValue,
        // validationSchema: signInValidation,
        onSubmit: () => {
			sendPasswordResetEmail (auth, formik.values.email).then(() => {
				console.log('Yes, Done!');
			}).catch((error) => {
				console.log(error.message);	
			})
        }
    });

	return (
		<div className='forget-wrapper'>
			<div className='forget-inner'>
				<h3>Reset Your Password</h3>
				<div className='forget-inner-body'>
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
						{/* <div> */}
							<Button
								variant='contained'
								type='submit'
								className='forget-button'
							>
								Reset
							</Button>
						{/* </div> */}
					</form>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword;