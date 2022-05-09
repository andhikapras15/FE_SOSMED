import axios from "axios"; 
import Cookies from 'js-cookie'
import { API_URL } from "../../helpers"; 
import { useState, useEffect } from "react";  
import { useRouter } from "next/router";
import Header from "../../components/header";
import PostDetails from "../../components/postDetail";
import Post from "../../components/post"; 
import calculateTime from "../../helpers/calculateTime";


const PostById = () => {
    const router = useRouter()
    let {postId} = router.query
    postId = parseInt(postId) 
    console.log('ini post id',postId);
    const [postDetailData, setPostDetailData] = useState([]) 
    // const postId = 92 
    const [commentsData, setCommentsData] = useState([]) 
    const [data,setData] = useState([])
    
    const getPostByPostId = async () => {
        let token = Cookies.get('token') 
        try {
            let res = await axios.get(`${API_URL}/post/getPostByPostId/${postId}`,{
                headers: {
                    authorization: `bearer ${token}`
                }
            }) 
            setPostDetailData(res.data) 
            console.log('ini res data', res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComment = async (e) => {
        let token = Cookies.get('token')
        try {
            let res = await axios.get(`${API_URL}/post/getComments/${postId}`,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            setCommentsData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const commentPost = async (comment) => {
        let token = Cookies.get('token')
        try {
            await axios.post(`${API_URL}/post/comment?post_id=${postId}`,{comment}, {
                headers: {
                    authorization: `bearer ${token}`
                }
            }) 
            setCommentsData(res.data)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(async() => {
        getPostByPostId()
    }, [])  

    const sendComment = async (comment) => {  
        
        let token = Cookies.get('token')
        try {
            await axios.post(`${API_URL}/post/comment?post_id=${postId}`,{comment}, {
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            await fetchComment()
            console.log('ini comment',{comment})
            // setComment("")
        } catch (error) {
          console.log(error)  
        }
    }  

    useEffect(()=>{
        fetchComment()
    },[])

    const editPostCaption = async (e) => {
        e.preventDefault()
        let token = Cookies.get('token')
        try {
            await axios.put(`${API_URL}/post/editCaption?post_id=${postId}`,
            {caption: editCaption}, {
                headers: {
                    authorization: `bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        } 
        onClose()
    }  

    const likeHandler =async (e) => {   
        e.preventDefault()
        let token = Cookies.get('token') 
        try {
            await axios.post(`${API_URL}/post/likePost?post_id=${postId}`,null,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        } 
        setLike(isLiked ? Like -1 : Like +1)
        setIsLiked(!isLiked)
    }  

    return (
        <div>
            {/* <Header/> */}
            {postDetailData.map((post) => (
                <PostDetails
                key={post.id}
                id={post.id}
                usernameuser={post.username}
                profilepicuser={API_URL + post.profilepic}
                numberOfLikes={post.number_of_likes} 
                imagepost={API_URL +post.image}
                createdAt={calculateTime(post.createdAt)}
                caption={post.caption}   
                // comments={post.comments}   
                commentsData={commentsData} 
                userId={post.Users_id}
                sendComment={sendComment} 
                editPostCaption={editPostCaption} 
                likePost={likeHandler}
                />
            ))}
        </div>
    )
} 
export async function getServerSideProps() {
    return {
      props: {},
    };
  }

export default PostById