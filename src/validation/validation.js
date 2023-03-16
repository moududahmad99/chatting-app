import * as Yup from "yup";

const signUpValidation = Yup.object({
    fullName: Yup.string().min(2).max(40).required("Please Enter Your Name!"),
    email: Yup.string().required("Please Enter Your Email!"),
    password: Yup.string().min(6).max(20).required("Please Enter Your Password!"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password Must Match!').min(6).max(20).required('Please Confirm your Password!')
})

export default signUpValidation;

export const signInValidation = Yup.object({
    email: Yup.string().required('Please Enter a Valid Email Address!'),
    password: Yup.string().min(6).max(20).required('Please Enter Your Password!')
})