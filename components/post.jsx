import {MdMoreVert} from "react-icons/md" 
import Image from "next/image"   
import heart from '../public/heart.png' 
import like from '../public/like.png'
import { API_URL } from "../helpers" 
import Share from "./share"
import axios from "axios"
import { useEffect, useState } from "react"
import useUser from "../hooks/useUser"
import { 
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button, 
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
 } from "@chakra-ui/react" 
 import { useDisclosure } from '@chakra-ui/react'  
 import Cookies from "js-cookie"
 import SendIcon from '@mui/icons-material/Send';
import calculateTime from "../helpers/calculateTime"
import Link from "next/link"
import {BsHeartFill, BsHeart} from 'react-icons/bs'


const Post = ({key, id, usernameuser, imagepost, caption, profilepicuser,createdAt, numberOfLikes,commentsData,countComments,liked}) => { 
    const { isOpen, onOpen, onClose } = useDisclosure()    
    const [Like, setLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false) 
    const [comment, setComment] = useState("") 
    const [data, setData] = useState([])  
    // const [commentsData, setCommentsData] = useState ([])

    const {profilepic} = useUser()  

    // const totalComments = async () => {
    //     let token = Cookies.get('token')
    //     try {
    //         await axios.get(`${API_URL}/post/countComments/${postId}`, {
    //             headers: {
    //                 authorization: `bearer ${token}`
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    // const likeHandler =async (e) => {   
    //     e.preventDefault()
    //     let token = Cookies.get('token') 
    //     try {
    //         await axios.post(`${API_URL}/post/likePost?post_id=${id}`,null,{
    //             headers: {
    //                 authorization: `bearer ${token}`
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     } 
    //     setLike(isLiked ? Like -1 : Like +1)
    //     setIsLiked(!isLiked)
    // }  

    // const fetchComment = async (e) => {
    //     let token = Cookies.get('token')
    //     try {
    //         await axios.get(`${API_URL}/post/getComments?post_id=${id}`,{
    //             headers: {
    //                 authorization: `bearer ${token}`
    //             }
    //         })
    //         setCommentsData(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    // const sendComment = async (e) => {  
    //     e.preventDefault()
    //     let token = Cookies.get('token')
    //     try {
    //         await axios.post(`${API_URL}/post/comment?post_id=${id}`,{comment}, {
    //             headers: {
    //                 authorization: `bearer ${token}`
    //             }
    //         })
    //         await fetchComment()
    //         console.log('ini comment',{comment})
    //         setComment("")
    //     } catch (error) {
    //       console.log(error)  
    //     }
    // }
    // const {profilepic} = useUser()
    // const [data, setData] = useState([]) 

    // const fetchData = async () => {
    //     try {
    //         await axios.get(`${API_URL}/post/get-post`) 
    //         setData(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // } 

    // useEffect(() => {
    //     fetchData()
    // }, [])
    
     return(
         <div key={id} className="w-full rounded-xl shadow-xl p-3 mt-8">
             <div className="flex items-center justify-between">
                <div className="flex items-center"> 
                    <img src={profilepicuser} className="w-8 h-8 rounded-full object-cover"/>
                    <span className="text-base font-medium mx-3">{usernameuser}</span>
                    <span className="text-xs">{createdAt}</span>
                </div> 
                <div>  
                    <Menu>
                        <MenuButton>
                           <MdMoreVert/>
                        </MenuButton>
                        <MenuList>
                            {/* <MenuItem>Delete</MenuItem>  */}
                            <Link href={`/post/${id}`}>
                                <MenuItem onClick={onOpen}>Details</MenuItem>  
                            </Link>
                        </MenuList>
                    </Menu>
                </div>
             </div>
             <div className="my-5"> 
                <span>{caption}</span> 
                <img src={imagepost} className="mt-5 w-full max-h-[500px] object-contain"/>
             </div>
             <div className="flex items-center justify-between mb-5"> 
                 <div className="flex"> 
                    <div className="w-6 h-6 mr-1 cursor-pointer">
                        <Image className="-z-50" src={like}  />
                    </div> 
                    <div className="w-6 h-6 mr-1 cursor-pointer">
                        {/* <Image className="-z-50" src={heart}  />  */}
                        <Link href={`/post/${id}`}>
                            {liked ? (<BsHeartFill className="text-red-600 text-2xl"/>):<BsHeart className="text-2xl"/>}
                        </Link>
                    </div>
                     <span  className="text-sm">{numberOfLikes} people like it</span>
                 </div>
                 <div>
                     <Link href={`/post/${id}`}>
                        <span className="cursor-pointer border-b-[1px] border-dashed border-gray-500">{countComments} comments</span>
                     </Link>
                 </div>  
             </div>
             {/* {commentsData.map((val)=>{ 
                  return (
                     <div className="mb-4">
                        <div className="flex">
                            <div className="mr-3">
                                <img src={`${API_URL+ val.profilepic}`} className="w-8 h-8 rounded-full object-cover"/>
                            </div> 
                            <p className="text-sm font-semibold mr-64">{val.usernameuser}</p>
                            <p>{calculateTime(val.createdAt)}</p>
                        </div>
                        <div>
                            {val.comment}
                        </div> 
                     </div>
                  )
             })}  */}
         </div>
     )
 } 

 export default Post