import { useState } from "react" 
import axios from "axios" 
import React from "react"
import Feed from "../components/feed"
import Header from "../components/header"
import SideBar from "../components/sidebar"
import Image from "next/image"  
import {AiFillCamera} from 'react-icons/ai' 
import {BsPencilFill} from 'react-icons/bs' 
import { 
    Button, 
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    Textarea, 
  } from '@chakra-ui/react' 
import { useDisclosure } from '@chakra-ui/react'  
import useUser from '../hooks/useUser' 
import { API_URL} from "../helpers" 
import Cookies from 'js-cookie'
import { editBioActions} from "../redux/actions/userActions" 
import { connect, useDispatch } from "react-redux"
import FeedProfile from "../components/feedProfile" 
import { toast } from "react-toastify"
  

const Profile = ({editBioActions}) => { 
    const dispatch = useDispatch()
    const { 
        isOpen: bioOpen, 
        onOpen: modalbioOpen, 
        onClose: bioClose } = useDisclosure() 
        
    const { 
        isOpen: profilepicOpen, 
        onOpen: modalpicOpen, 
        onClose: profilepicClose } = useDisclosure() 
        
    const [fileupload,setupload] = useState(null)   
    const [input,setinput] = useState({
        // profilepic:"", 
        fullname:"",
        bio: "",
        username: ""
    })  
    const [value,setValue] = React.useState('') 
    const handleInputChange = (e) => { 
        let inputValue = e.target.value
        setValue(inputValue)
    }  
    

    const [selectedImage,setselectedImage] = useState({
        file:[], 
        filePreview:null
    })  


    const onFileChange = (e) => {
        console.log(e.target.files[0])
        if(e.target && e.target.files[0]){
            setselectedImage({...selectedImage,file:e.target.files[0],filePreview:URL.createObjectURL(e.target.files[0])})
        }
    }    

    const onFileBioChange = (e) => { 
        setinput({...input,[e.target.name]:e.target.value})
    }

     
    const onSaveDataClick = async () =>{ 
        let token = Cookies.get('token')
        const formData = new FormData()
        
        formData.append('profilepic', selectedImage.file) 
        
        try {
            let res = await axios.put(`${API_URL}/profile/profile`,formData,{
                headers: {
                    authorization: `bearer ${token}`
                }
            }) 
            
           
            profilepicClose()
        } catch (error) {
            console.log(error)
        }
    }  

    const onSaveDataClickBio = (e) => { 
        e.preventDefault() 
        editBioActions(input)
        console.log(input)
        bioClose()
    }  

    const sendEmailVerified = async () => {
        try {
            await axios.post(`${API_URL}/auth/sendemail-verified`,{
                id,
                email,
                username
            }) 
            toast.success("Please Check Your Email", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            })
        } catch (error) {
            console.log(error)
        }
    }

    
    // const sendEmailVerified = async () => {
        //     try {
            //         await axios.post(`${API_URL}/auth/sendemail-verified`,{
                //             id,
                //             email,
                //             username
                //         }) 
                //         toast.success("Please Check Your Email", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             closeOnClick: true,
    //             draggable: true,
    //         })
    //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        
    const {isVerified, bio, fullname, profilepic, username, email,id} = useUser()  
    const avatar = profilepic ? `${API_URL+ profilepic}` : `${API_URL}/avatar.jpg` 
    const yourFullname = fullname ? fullname : 'fullname'
    const yourBio = bio ? bio : 'bio'

    return (
        <div>
            <Header/>
            <div className="flex min-w-full">
                <SideBar/>
                <div className="flex-[9] w-full"> 
                    <div className="profile h-80 relative mb-14"> 
                        <div className="mb-14 ">
                            <img src={"/backgroundprofile.jpg"}  className="w-full h-64 object-cover absolute -z-50"/>
                            <img src={avatar}  className="w-[150px] h-[150px] cursor-pointer rounded-full object-cover absolute left-0 right-0 top-40 border-2 border-white m-auto -z-50"/> 
                            <AiFillCamera onClick={modalpicOpen} className="ml-96 text-xl mb-72 cursor-pointer"/>   
                            <Modal 
                                isOpen={profilepicOpen}
                                onClose={profilepicClose}
                            > 
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit Profile Picture</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody> 
                                        <input type="file" name="image" accept=".gif,.jpg,.jpeg,.png" onChange={onFileChange}/> 
                                        {profilepic && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" className="object-cover w-36 h-36 mt-8 ml-36 rounded-full flex justify-center items-center"/> : null}
                                        {!profilepic && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" className="object-cover w-28 h-28 mt-8 rounded-full "/> : null}
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={profilepicClose}>
                                        Close
                                        </Button>
                                        <Button variant='ghost' onClick={onSaveDataClick}>Save</Button>
                                 </ModalFooter>
                                </ModalContent>
                            </Modal>       
                        </div> 
                        <div className="flex flex-col items-center justify-center b-20">
                            <h4 className="text-xl font-bold -z-50">{yourFullname}</h4> 
                            {/* <h4 className="text-xl font-bold">@{username}</h4> 
                            <h4 className="text-xl font-bold">{email}</h4>  */}
                            <div className="flex">
                                <span className="text-xl font-light mr-3 -z-50">{yourBio}</span> 
                                <BsPencilFill onClick={modalbioOpen} className="cursor-pointer "/> 
                                    <Modal
                                        // initialFocusRef={initialRef}
                                        // finalFocusRef={finalRef}
                                        isOpen={bioOpen}
                                        onClose={bioClose}
                                    >
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader>Edit Profile</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}> 
                                            <form >
                                                <FormControl>
                                                <FormLabel>Fullname</FormLabel>
                                                <Input name="fullname" value={input.fullname} placeholder='Fullname' onChange={onFileBioChange} />
                                                </FormControl>

                                                <FormControl>
                                                <FormLabel>Username</FormLabel>
                                                <Input name="username" value={input.username} placeholder='Username' onChange={onFileBioChange} />
                                                </FormControl>

                                                <FormControl mt={4} >
                                                <FormLabel>Bio</FormLabel>
                                                <Textarea name="bio" value={input.bio} onChange={onFileBioChange} placeholder='Bio' height={40} />
                                                </FormControl> 
                                            </form>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button onClick={onSaveDataClickBio} colorScheme='blue' mr={3}>
                                            Save
                                            </Button>
                                            <Button onClick={bioClose}>Cancel</Button>
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                            </div>
                        </div>
                    </div> 
                    <div className="w-full flex mt-10"> 
                        <FeedProfile/>
                        {/* <RightBar/> */}
                        <div>
                            <div className="mb-7 px-5 mt-10 ">                         
                                <h4 className="text-xl font-bold mt-10 mb-4">User Information</h4> 
                                <div>
                                    <span>Fullname :</span>
                                    <span> {yourFullname}</span> 
                                </div>
                                <div>
                                    <span>Username : </span>
                                    <span> {username}</span> 
                                </div>
                                <div>
                                    <span>email : </span>
                                    <span> {email}</span> 
                                </div>
                                <div>
                                    <span>Phone : </span>
                                    <span>+62 856 9464 0366</span> 
                                </div>
                                <div>
                                    <span>Relationship : </span>
                                    <span>Single</span> 
                                </div> 
                                
                            </div> 
                            <h4 className="text-xl font-bold mb-4 px-5">User Friends</h4>
                            <div className="flex flex-wrap px-5"> 
                                <div className="mr-3 mb-3">
                                    <img src={"/profile2.jpg"} className="w-[100px] h-[100px] object-cover rounded-md"/> 
                                    <span>Mamat Kopling</span>
                                </div> 
                                <div className="mr-3">
                                    <img src={"/profile3.jpg"} className="w-[100px] h-[100px] object-cover rounded-md"/> 
                                    <span>Mamat Kopling</span>
                                </div> 
                                <div className="mr-3">
                                    <img src={"/profile4.jpg"} className="w-[100px] h-[100px] object-cover rounded-md"/> 
                                    <span>Mamat Kopling</span>
                                </div> 
                                <div className="mr-3">
                                    <img src={"/profile5.jpg"} className="w-[100px] h-[100px] object-cover rounded-md"/> 
                                    <span>Mamat Kopling</span>
                                </div> 
                                <div className="mr-3">
                                    <img src={"/profile6.jpg"} className="w-[100px] h-[100px] object-cover rounded-md"/> 
                                    <span>Mamat Kopling</span>
                                </div> 
                                <div className="mr-3">
                                    <img src={"/profile7.jpg"} className="w-[100px] h-[100px] object-cover rounded-md"/> 
                                    <span>Mamat Kopling</span>
                                </div> 
                            </div>
                            {!isVerified ? (
                            <div className="p-5">
                            <p className="mb-2">
                                Please Verify Your Email Account !
                            </p>
                            <button className="w-64 h-12 self-center rounded-xl border-0 bg-green-500 text-white text-xl font-medium cursor-pointer" onClick={sendEmailVerified}>Send Email Verified</button>
                            </div>):null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default connect(null,{editBioActions})(Profile) 