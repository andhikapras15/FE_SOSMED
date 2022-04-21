import { useEffect, useState } from "react"; 
import { AxiosInstance } from "../helpers"; 
import Cookies from "js-cookie"; 
import { useDispatch } from "react-redux"; 
const AuthProvider = ({children}) => {
    const dispatch = useDispatch()
    const [loading,setloading] = useState(true)
    useEffect(async()=>{
        try {
            let token = Cookies.get('token') 
            if(token){
                let result = await AxiosInstance.get(`/auth/keeplogin`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }) 
                console.log(result.data)
                dispatch({type: 'LOGIN', payload: result.data})
            }
        } catch (error) {
            console.log('error')
        }finally{
            setloading(false)
        }
    },[]) 

    if(loading){
        return <div>loadingggg...</div>
    } 
    return children
} 

export default AuthProvider