import Link from "next/link" 
import { useRouter } from "next/router" 
import { useEffect, useState } from "react" 
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs' 
import { connect, useSelector } from "react-redux" 
// import useLoading from '../hooks/useLoading' 
import {loginActions} from '../redux/actions/userActions.jsx'
import * as Yup from "yup" 
import { useFormik } from "formik";
import { toast } from "react-toastify"
import useUser from "../hooks/useUser.jsx"


const Login = ({loginActions}) => { 
    // const router = useRouter() 
    // const [input, setinput] = useState({
    //     username: '',
    //     password: ''
    // }) 
    const router = useRouter()
    // const {loading} = useLoading()
    const {isLogin} = useSelector((state)=> state.user)
    // const handleInput = (e, prop) => {
    //     setinput({...input, [prop]:e.target.value})
    
    // } 
    const [enableButton, setEnableButton] = useState(false)
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show) 

    const formik = useFormik ({
        initialValues: {
            username: '',
            password: ''
        }, 
        validationSchema: Yup.object().shape({
            username: Yup.string()
            .required('username is required'), 
            password: Yup.string()
            .required('password is required')
        }), 
        onSubmit: async(values) => { 
            try {
                setEnableButton(true)
                loginActions(values)
            } catch (error) {
                console.log(error)
            } finally {
                setEnableButton(false)
            }
        }
    }) 

    
    if(isLogin) {
        router.replace('/home')
    }
        

    // const loginHandle = (e) => {
    //     e.preventDefault()
    //     loginActions(input,router) 
    //     if(input.password !== data.password){
    //         toast.error("user tidak ditemukan", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             closeOnClick: true,
    //             draggable: true,
    //         }) 
    //         return
    //     } 
    // }
    return (
        <div className="h-[100vh] bg-purple-600 flex items-center justify-center">
            <div className="w-[70%] h-[70%] bg-purple-600 flex">
                <div className="basis-1/2 flex justify-center flex-col">
                    <div className="text-5xl text-white font-bold mb-3">Social Media</div> 
                    <span className="text-white  text-2xl">Connect with friends and the world around you on Social Media</span>
                </div>
                <div className="basis-1/2 p-6"> 
                    <div className="h-full p-5 bg-white rounded-xl flex flex-col justify-between" > 
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input name="username" className="h-12 w-full mb-2 mt-2 rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Username or Email" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} required></input> 
                                {formik.touched.username && formik.errors.username ? <p className="text-sm ml-2 text-red-600">{formik.errors.username}</p> : null}
                            </div>
                            <div className="flex flex-col relative">
                                <input name="password" type={show ? 'text':'password'} className="h-12 mt-2 w-full mb-2 rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} required></input> 
                                {formik.touched.password && formik.errors.password ? <p className="text-sm ml-2 text-red-600">{formik.errors.password}</p> : null}   
                                <div className="mt-5 right-4 absolute" onClick={handleClick}>{show?<BsEyeFill/>:<BsEyeSlashFill/>}</div>
                            </div>
                            {isLogin ? null :  
                            <button className="h-12 mt-5 w-full rounded-xl border-0 bg-purple-600 text-white text-xl font-medium cursor-pointer">Log In</button> }
                        </form>
                        <span className="text-center text-purple-600">Forgot Password?</span>  
                        <Link href='/register'>
                            <button className="w-56 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer">Create a New Account</button>
                        </Link>
                    </div>
                </div>
            </div>   
        </div>
    )
} 

// export default Login 
export default connect(null, { loginActions })(Login);