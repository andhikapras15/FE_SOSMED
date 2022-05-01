import React from "react";
import { useState } from "react" 
import {connect, useSelector} from 'react-redux'
import {registerActions} from '../redux/actions/userActions.jsx' 
import { toast } from "react-toastify";  
import {AiFillEye} from "react-icons/ai"
import * as Yup from "yup" 
import { 
    InputRightElement, 
    Button, 
 } from "@chakra-ui/react"; 
import { useFormik } from "formik";


const Register = ({registerActions}) => {   

    // const[input,setinput] = useState({
    //     username: '', 
    //     password: '',
    //     confirmPassword: '', 
    //     email: ''
    // })  
    
    const {isLogin} = useSelector((state)=> state.user)
    // const handleInput = (e,prop) => {
    //     setinput({...input, [prop]: e.target.value})
    // }   
    
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show) 

    const [dissableButton, setdissableButton]  = useState(false)
    
    const formik = useFormik ({
        initialValues: {
            username: '', 
            password: '',
            confirmPassword: '', 
            email: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
            .required('username is required'),
            email: Yup.string()
            .required('email is required')
            .email('email is invalid'),
            password: Yup.string()
            .required('password is required')
            .min(8,'password must be at least 8 characters'),
            // .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8-20}$/, 'password must be at least 1 number, 1 letter, and 1 special characters'), 
            confirmPassword: Yup.string()
            .required('confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }), 
        onSubmit: async(values) => {
            try {
                registerActions(values) 
                setdissableButton(true)
            } catch (error) {
                console.log(error)
            } finally {
                setdissableButton(false)
            }
        }
    }) 

    // const registerHandle = (e) => {
    //     e.preventDefault()
    //     if(input.password !== input.confirmPassword){
    //         toast.error("password tidak sama dengan confirm", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             closeOnClick: true,
    //             draggable: true,
    //         }) 
    //         return
    //     } 
    //     registerActions(input)
    // } 
    
    return (
        <div className="h-[100vh] bg-purple-600 flex items-center justify-center">
            <div className="w-[70%] h-[70%] bg-purple-600 flex">
                <div className="basis-1/2 flex justify-center flex-col">
                    <div className="text-5xl text-white font-bold mb-3">Social Media</div> 
                    <span className="text-white  text-2xl">Connect with friends and the world around you on Social Media</span>
                </div>
                <div className="basis-1/2 p-6">  
                    <div className="h-min-full p-5 bg-white rounded-xl flex flex-col justify-between" >
                        <form onSubmit={formik.handleSubmit} className="h-[350px]"> 
                            <div>
                                <input name="username" className="h-12 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} required></input>
                                {formik.touched.username && formik.errors.username ? <p>{formik.errors.username}</p> : null}   
                            </div> 
                            <div>
                                <input name="email" className="h-12 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} required></input>  
                                {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}   
                            </div>
                            <div>
                                <input name="password" type="password" className="h-12 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} required></input>
                                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}   
                            </div> 
                            <div>
                                <input name="confirmPassword" type="password" className="h-12 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Confirm Password" onChange={formik.handleChange} value={formik.values.confirmPassword} required></input>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p> : null}   
                            </div>
                            <button type="submit" className="w-full mb-4 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer">Register</button>
                        </form>
                    </div>
                </div>
            </div>   
        </div>
    )
} 

// export default Register 
export default connect(null, { registerActions })(Register);