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
 } from "@chakra-ui/react" 
 import { useDisclosure } from '@chakra-ui/react'  
 import Cookies from 'js-cookie'

const PostProfile = ({key, id, username, imagepost, caption, profilepicuser,createdAt}) => { 
    const { isOpen, onOpen, onClose } = useDisclosure()   
    
    const onDeleteClick = async () => {
        let token = Cookies.get('token')
        console.log('ini key', key)
        console.log('ini id',id)
        try {
            await axios.delete(`${API_URL}/post/deletePost?id=${id}`,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })
        } catch (error) { 
            console.log(error)
            
        }
    }
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
         <div className="w-full rounded-xl shadow-xl p-3 mt-8">
             <div className="flex items-center justify-between">
                <div className="flex items-center"> 
                    <img src={profilepicuser} className="w-8 h-8 rounded-full object-cover"/>
                    <span className="text-base font-medium mx-3">{username}</span>
                    <span className="text-xs">{createdAt}</span>
                </div> 
                <div> 
                    <Menu>
                        <MenuButton>
                            <MdMoreVert/>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onDeleteClick}>Delete</MenuItem> 
                            <MenuItem onClick={onOpen}>Edit</MenuItem>
                            <Modal 
                                isOpen={isOpen}
                                onClose={onClose}
                            > 
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit Post</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody> 
                                        <input type="file" name="image" accept=".gif,.jpg,.jpeg,.png" /> 
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                        </Button>
                                        <Button variant='ghost' onClickx>Save</Button>
                                 </ModalFooter>
                                </ModalContent>
                            </Modal>  
                        </MenuList>
                    </Menu>
                </div>
             </div>
             <div className="my-5"> 
                <span>{caption}</span> 
                <img src={imagepost} className="mt-5 w-full max-h-[500px] object-contain"/>
             </div>
             <div className="flex items-center justify-between"> 
                 <div className="flex"> 
                    <div className="w-6 h-6 mr-1 cursor-pointer">
                        <Image src={like}  />
                    </div> 
                    <div className="w-6 h-6 mr-1 cursor-pointer">
                        <Image src={heart}  /> 
                    </div>
                     <span className="text-sm"> people like it</span>
                 </div>
                 <div>
                     <span className="cursor-pointer border-b-[1px] border-dashed border-gray-500">9 comments</span>
                 </div>
             </div>
         </div>
     )
 } 

 export default PostProfile