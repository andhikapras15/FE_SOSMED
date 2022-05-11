import React from "react";
import { useState } from "react" 
import {connect, useSelector} from 'react-redux'
import {registerActions} from '../redux/actions/userActions.jsx' 
import { toast } from "react-toastify";  
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs'
import * as Yup from "yup" 
import { 
    InputRightElement, 
    Button, 
 } from "@chakra-ui/react"; 
import { useFormik } from "formik";
import { useRouter } from "next/router" 


const Register = ({registerActions}) => {   

    const router = useRouter()

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
    
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show) 

    const [show1, setShow1] = useState(false)
    const handleClick1 = () => setShow1(!show1)

    const [disableButton, setdisableButton]  = useState(false)
    
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
            .min(8,'password must be at least 8 characters')
            // .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8-20}$/, 'password must be at least 1 number, 1 letter, and 1 special characters'), 
            .matches(/[A-Z]/g, "Must be at least 1 uppercase letter").matches(/[a-z]/g, "Must be at least 1 lowercase letter").matches(/[0-9]/g, "Must be at least 1 number").matches(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g, "Must be at least 1 special character"),
            confirmPassword: Yup.string()
            .required('confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }), 
        onSubmit: async(values) => {
            try {
                setdisableButton(true)
                registerActions(values) 
            } catch (error) {
                console.log(error)
            } finally {
                setdisableButton(false)
            }
        }
    })  

    // if(isLogin) {
    //     router.replace('/profile')
    // }

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
                                <input name="username" className="h-12 mb-1 mt-1 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} required></input>
                                {formik.touched.username && formik.errors.username ? <p className="text-sm ml-2 text-red-600">{formik.errors.username}</p> : null}   
                            </div> 
                            <div>
                                <input name="email" className="h-12 mb-1 mt-1 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} required></input>  
                                {formik.touched.email && formik.errors.email ? <p className="text-sm ml-2 text-red-600">{formik.errors.email}</p> : null}   
                            </div>
                            <div className="flex flex-col relative">
                                <input name="password" type={show ? 'text':'password'} className="h-12 mb-1 mt-1 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} required></input>
                                {formik.touched.password && formik.errors.password ? <p className="text-sm ml-2 text-red-600">{formik.errors.password}</p> : null}   
                                <div className="mt-5 right-4 absolute" onClick={handleClick}>{show?<BsEyeFill/>:<BsEyeSlashFill/>}</div>
                            </div> 
                            <div className="flex flex-col relative">
                                <input name="confirmPassword" type={show1 ? 'text':'password'} className="h-12 mb-1 mt-1 w-full rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Confirm Password" onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur} required></input>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-sm ml-2 text-red-600">{formik.errors.confirmPassword}</p> : null}   
                                <div className="mt-5 right-4 absolute" onClick={handleClick1}>{show1?<BsEyeFill/>:<BsEyeSlashFill/>}</div>
                            </div>
                            {disableButton ? <div ><button disabled type="submit" className="w-full mb-4 mt-1 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer">Register</button></div> : 
                            <button type="submit"  className=" w-full mb-4 mt-1 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer">Register</button>}
                        </form>
                    </div>
                </div>
            </div>   
        </div>
    )
} 

// export default Register 
export default connect(null, { registerActions })(Register);