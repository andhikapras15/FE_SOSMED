import { data } from "autoprefixer"
import { API_URL } from "../helpers"
import Post from "./post"
import Share from "./share" 
import { useState, useEffect } from "react" 
import axios from "axios"

const Feed = () => {  
    const [data, setData] = useState([]) 

    const fetchData = async () => {
        try {
            let res = await axios.get(`${API_URL}/post/getPost`) 
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }  

    useEffect(() => {
        fetchData()
    }, []) 

    return (
        <div className="max-w-xl p-5">
            <Share/> 
            {data.map((post) => (
                <Post 
                key={post.id}
                id={post.id}
                username={post.username}
                profilepicuser={API_URL + post.profilepic}
                numberOfLikes={post.number_of_likes} 
                imagepost={post.image}
                caption={post.caption} 
                />
            ))}
        </div>
    )
} 

export default Feed