// import { data } from "autoprefixer"
import { API_URL } from "../helpers"
import PostProfile from "./postProfile"
import Share from "./share" 
import { useState, useEffect } from "react" 
import axios from "axios" 
import InfiniteScroll from "react-infinite-scroll-component" 
import calculateTime from "../helpers/calculateTime" 
import Cookies from 'js-cookie'

const FeedProfile = () => {  
    const [data, setData] = useState([])  
    // const [feed, setFeed] = useState([])
    const[hasMore,setHasMore] = useState(true) 
    const [page, setPage] = useState(0)   
    const limit = 3

    const fetchDataScroll = async () => {
        try { 
            let token = Cookies.get('token')
            const res = await axios.get( 
                `${API_URL}/post/getPostById?page=${page}&limit=${limit}`,{
                    headers: {
                        authorization: `bearer ${token}`
                    }}
            ) 
            if (res.data.length === 0) {setHasMore(false)}
            setData((prev) => [...prev,...res.data]) 
            setPage((prev) => prev + 1)
        } catch (error) {
            console.log (error)
        }
    }

    // const fetchData = async () => {
    //     try {
    //         let res = await axios.get(`${API_URL}/post/getPost`) 
    //         setData(res.data) 
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }  

    useEffect(() => {
        fetchDataScroll()
    }, []) 

    return (
        <div className="w-5/6 p-5"> 
            <InfiniteScroll 
            dataLength={data.length} //This is important field to render the next data
            next={fetchDataScroll}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
            </p>
                }
            >
                <Share/> 
                {data.map((postProfile) => (
                    <PostProfile
                    key={postProfile.id}
                    id={postProfile.id}
                    username={postProfile.username}
                    profilepicuser={API_URL + postProfile.profilepic}
                    numberOfLikes={postProfile.number_of_likes} 
                    imagepost={API_URL +postProfile.image}
                    createdAt={calculateTime(postProfile.createdAt)}
                    caption={postProfile.caption} 
                    liked={postProfile.already_like}
                    />
                    ))}
            </InfiniteScroll>
        </div>
    )
} 

export default FeedProfile