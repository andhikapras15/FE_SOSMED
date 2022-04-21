import axios from 'axios' 
import Cookies from 'js-cookie'
import {API_URL} from '../../helpers'

export const loginActions = ({ username, password}, router) => {
    return async (dispatch) => { 
        try {
            dispatch({type: 'LOADING'})
            let res = await axios.post(`${API_URL}/auth/login`,{
                username, 
                email: username, 
                password
            }) 
            console.log(res.data)
            dispatch({type: 'LOGIN', payload:res.data})

            Cookies.set('token', res.headers['x-token-access']) 
            router.push('/')
        } catch (error) {
            console.log(error.response)
            dispatch({type: 'ERROR', payload: error.message})
        }finally{
            dispatch({type: 'DONE'})
        }
    }
} 

export const registerActions = ({username, password, email}) => {
    return async (dispatch) => {
        try {
            dispatch({type: "LOADING"})
            let res1 = await axios.post(`${API_URL}/auth/register`, {
                username, 
                password, 
                email
            }) 
            dispatch({type:'LOGIN', payload: res1.data})
            Cookies.set('token', res1.headers['x-token-access'])  
            router.push('/login')
        } catch (error) {
            // console.log(error.response.data.message)
            dispatch({type: 'LOGIN', payload:error.message || 'network error'})
        }finally{
            dispatch({type: 'DONE'})
        }
    }
}