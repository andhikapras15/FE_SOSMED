import Link from "next/link" 
import { useRouter } from "next/router" 
import { useEffect, useState } from "react" 
import {MdVisibility, MdVisibilityOff} from 'react-icons/md' 
import { connect, useSelector } from "react-redux" 
// import useLoading from '../hooks/useLoading' 
import {loginActions} from '../redux/actions/userActions.jsx'

const Login = ({loginActions}) => { 
    const router = useRouter() 
    const [input, setinput] = useState({
        username: '',
        password: ''
    }) 

    // const {loading} = useLoading()
    const {isLogin} = useSelector((state)=> state.user)
    const handleInput = (e, prop) => {
        setinput({...input, [prop]:e.target.value})
    } 
    useEffect(()=>{
        if(isLogin) {
            router.replace('/')
        }
    }, []) 

    const loginHandle = (e) => {
        e.preventDefault()
        loginActions(input,router) 
        if(input.password !== data.password){
            toast.error("user tidak ditemukan", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            }) 
            return
        } 
    }
    return (
        <div className="h-[100vh] bg-purple-600 flex items-center justify-center">
            <div className="w-[70%] h-[70%] bg-purple-600 flex">
                <div className="basis-1/2 flex justify-center flex-col">
                    <div className="text-5xl text-white font-bold mb-3">Social Media</div> 
                    <span className="text-white  text-2xl">Connect with friends and the world around you on Social Media</span>
                </div>
                <div className="basis-1/2 p-6"> 
                    <div className="h-full p-5 bg-white rounded-xl flex flex-col justify-between" > 
                        <form onSubmit={loginHandle}>
                            <input className="h-12 w-full mb-5 rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Username or Email" onChange={(e)=> handleInput(e, 'username')} value={input.username}></input> 
                            <input type="password"className="h-12 w-full mb-5 rounded-xl border-[1px] border-gray-400 text-lg pl-5 focus:outline-none" placeholder="Password" onChange={(e)=> handleInput(e, 'password')} value={input.password}></input> 
                            <button className="h-12 w-full rounded-xl border-0 bg-purple-600 text-white text-xl font-medium cursor-pointer">Log In</button> 
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