import { useState } from "react"
import Header from "./header"
import Post from "./post"
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
 import {MdMoreVert} from "react-icons/md" 
import Image from "next/image"   
import heart from '../public/heart.png' 
import like from '../public/like.png'
import { API_URL } from "../helpers" 
import Share from "./share"
import axios from "axios"

import useUser from "../hooks/useUser"

 import { useDisclosure } from '@chakra-ui/react'  
 import Cookies from "js-cookie"
 import SendIcon from '@mui/icons-material/Send';
import calculateTime from "../helpers/calculateTime"
import Link from "next/link"

const PostDetails = ({ usernameuser, imagepost, caption, profilepicuser,createdAt, numberOfLikes,commentsData,userId, sendComment,editPostCaption,likePost})=>{
     const [comment,setComment] = useState("") 
     const [commentMore, setCommentMore] = useState(5)
     const showMore = () => {
         setCommentMore(commentsData.length)
     }
     const showLess = () => {
         setCommentMore(5)
     }
    
     const sendPostDetail = async (e) => {
          e.preventDefault()
         try {
             await sendComment(comment) 
             setComment("")
         } catch (error) {
             console.log(error)
         }
     } 

     const likePostDetail = async (e) => {
         e.preventDefault()
         try {
             await likePost()
         } catch (error) {
             console.log(error)
         }
     }

     const [canEdit, setCanEdit] = useState() 
     const [editCaption, setEditCaption] = useState(caption)

     const editCaptionDetail = async (e) => {
         e.preventDefault() 
         try {
             await editPostCaption(editCaption)
             setCanEdit(false)
         } catch (error) {
             console.log(error)
         }
     }
     
     return (  
        <div>
            <Header/> 
            
            <div  className="w-4/6 rounded-xl shadow-xl p-3 mt-8 ml-10">
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
                            <MenuItem>Delete</MenuItem> 
                            {/* <Link href={`/post/${id}`}>
                                <MenuItem onClick={onOpen}>Details</MenuItem>  
                            </Link> */}
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
                        <Image src={like}  />
                    </div> 
                    <div className="w-6 h-6 mr-1 cursor-pointer">
                        <Image src={heart}  /> 
                    </div>
                     <span  className="text-sm">{numberOfLikes}people like it</span>
                 </div> 
                 <div>
                     <span className="cursor-pointer border-b-[1px] border-dashed border-gray-500">9 comments</span>
                 </div>
             </div>
             {commentsData.slice(0,commentMore).map((val)=>{ 
                  return (
                     <div className="mb-4">
                        <div className="flex">
                            <div className="mr-3">
                                <img src={`${API_URL+ val.profilepic}`} className="w-8 h-8 rounded-full object-cover"/>
                            </div> 
                            <div className="flex-col">
                                <p className="text-sm font-semibold ">{val.username}</p>
                                <p className="text-xs items-end ">{calculateTime(val.createdAt)}</p>
                            </div>
                        </div>
                        <div>
                            {val.comment}
                        </div> 
                     </div>
                  )
             })} 
             <div className="mb-5">
                {commentMore ===5 && commentsData.length>5 ? (<span className="cursor-pointer" onClick={showMore}>ShowMore....</span>):null}
                {commentMore == commentsData.length && commentsData.length !==0 ? (<span className="cursor-pointer" onClick={showLess}>ShowLess</span>): null}    
             </div>
               <div className="flex">
                    <div className="mr-3">
                        <img src={profilepicuser} className="w-8 h-8 rounded-full object-cover"/>
                    </div> 
                    <div className="flex-col">
                        <span className="text-sm font-semibold mr-64">{usernameuser}</span> 
                        <div> 
                            <form onSubmit={sendPostDetail}>
                                <input placeholder="Comment here" className="border-0 focus:outline-none w-full" onChange={(e) => {setComment(e.target.value)}}/>
                            </form>
                            <SendIcon onClick={sendPostDetail}/>
                        </div>
                    </div>
               </div>
         </div>
        </div>
    )
} 

export default PostDetails