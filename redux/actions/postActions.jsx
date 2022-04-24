import axios from "axios"; 
import Cookies from "js-cookie" 
import { API_URL } from "../../helpers"; 

export const postActions = ({...input}) => { 
    return async (dispatch) => {
        try { 
            dispatch ({type: "LOADING"})
            let token = Cookies.get('token')
            let res = await axios.post(`${API_URL}/post/post`,{...input},{
                headers: {
                    authorization: `bearer ${token}`
                }
            }) 
            dispatch({type:'LOGIN', payload:res.data})
        } catch (error) { 
            dispatch({type:'LOGIN', payload:error.message || 'network error'})
            
        } finally{
            dispatch({type:'DONE'})
        }
    }
}