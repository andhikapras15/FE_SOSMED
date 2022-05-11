// import { data } from "autoprefixer"
import { API_URL } from "../helpers"
import Post from "./post"
import Share from "./share" 
import { useState, useEffect } from "react" 
import axios from "axios" 
import InfiniteScroll from "react-infinite-scroll-component" 
import calculateTime from "../helpers/calculateTime" 
import Image from "next/image" 
import Cookies from 'js-cookie'

const Feed = () => {  
    const [data, setData] = useState([])  
    // const [feed, setFeed] = useState([])
    const[hasMore,setHasMore] = useState(true)  
    const [commentsData, setCommentsData] = useState ([])

    const [page, setPage] = useState(0)   
    const limit = 2

    const fetchDataScroll = async () => {
        let token = Cookies.get('token')
        try {
            const res = await axios.get( 
                `${API_URL}/post/getPost?page=${page}&limit=${limit}`,{
                    headers: {
                        authorization: `bearer ${token}`
                    }
                }
            ) 
            if (res.data.length === 0) setHasMore(false)
            setData((prev) => [...prev,...res.data]) 
            setPage((prev) => prev + 1)
        } catch (error) {
            console.log (error)
        }
    } 

    const fetchComment = async (e) => {
        let token = Cookies.get('token')
        try {
            await axios.get(`${API_URL}/post/getComments?post_id=${id}`,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            setCommentsData(res.data)
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        fetchComment()
    }, []) 
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
        <div className="w-6/12 p-5"> 
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
                {data.map((post) => (
                    <Post 
                    key={post.id}
                    id={post.id}
                    usernameuser={post.username}
                    profilepicuser={API_URL + post.profilepic}
                    numberOfLikes={post.number_of_likes} 
                    imagepost={API_URL +post.image}
                    createdAt={calculateTime(post.createdAt)}
                    caption={post.caption}   
                    comments={post.comments}   
                    commentsData={commentsData}   
                    liked={post.already_like}
                    />
                    ))}
            </InfiniteScroll>
        </div>
    )
} 

export default Feed