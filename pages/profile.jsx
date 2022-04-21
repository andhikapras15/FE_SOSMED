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
    Textarea 
  } from '@chakra-ui/react' 
import { useDisclosure } from '@chakra-ui/react'  
import useUser from '../hooks/useUser' 
import { API_URL} from "../helpers" 
import Cookies from 'js-cookie'
import { loginActions } from "../redux/actions/userActions"
  

const Profile = () => { 
    const { 
        isOpen: bioOpen, 
        onOpen: modalbioOpen, 
        onClose: bioClose } = useDisclosure() 
        
    const { 
        isOpen: profilepicOpen, 
        onOpen: modalpicOpen, 
        onClose: profilepicClose } = useDisclosure() 
        
    const { 
        isOpen: informationOpen, 
        onOpen: modalinfoOpen, 
        onClose: informationClose } = useDisclosure()
        
    const [fileupload,setupload] = useState(null)   
    const [input,setinput] = useState({
        profilepic:"", 
        fullname:"",
        bio: ""
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
    const [editBio,setEditBio] = useState({
        fullname: "",
        bio: ""
    })

    const onFileChange = (e) => {
        console.log(e.target.files[0])
        if(e.target && e.target.files[0]){
            setselectedImage({...selectedImage,file:e.target.files[0],filePreview:URL.createObjectURL(e.target.files[0])})
        }
    }    

    const onFileBioChange = (e,prop) => { 
        setinput({...input,[prop]:e.target.value})
    }

     
    const onSaveDataClick = async () =>{ 
        let token = Cookies.get('token')
        const formData = new FormData()
        
        formData.append('profilepic', selectedImage.file) 
        
        try {
            await axios.put(`${API_URL}/profile/profile`,formData,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })  
            profilepicClose()

        } catch (error) {
            console.log(error)
        }
    } 

    const onSaveDataClickBio = async (e) =>{  
        e.preventDefault()
        let token = Cookies.get('token')
        // const formData = new FormData()
        let insertData = {
            fullname: input.fullname,
            bio:input.bio 
        } 
        // formData.append('fullname', editBio)  
        // formData.append('bio', editBio)
        try {
            await axios.put(`${API_URL}/profile/editBio`,insertData,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })  
            bioClose()

        } catch (error) {
            console.log(error)
        } 
        
    }
   
    const {bio, fullname, profilepic, username, email,id} = useUser()  


    return (
        <div>
            <Header/>
            <div className="flex min-w-full">
                <SideBar/>
                <div className="flex-[9] w-full"> 
                    <div className="profile h-80 relative mb-14"> 
                        <div className="mb-14 z-50">
                            <img src={"/backgroundprofile.jpg"} className="w-full h-64 object-cover"/>
                            <img src={`${API_URL+profilepic}`} className="w-[150px] h-[150px] rounded-full object-cover absolute left-0 right-0 top-40 border-2 border-white m-auto"/> 
                            <AiFillCamera onClick={modalpicOpen} className="ml-96 text-xl cursor-pointer"/>   
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
                                        {fileupload ? <img src={URL.createObjectURL(fileupload)}/>:null}
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
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="text-2xl font-bold">{ `${fullname}`}</h4> 
                            <div className="flex">
                                <span className="font-light mr-3">{ `${bio}`}</span> 
                                <BsPencilFill onClick={modalbioOpen} className="cursor-pointer"/> 
                                    <Modal
                                        // initialFocusRef={initialRef}
                                        // finalFocusRef={finalRef}
                                        isOpen={informationOpen}
                                        onClose={bioClose}
                                    >
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader>Edit Profile</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}>
                                            <FormControl>
                                            <FormLabel>Fullname</FormLabel>
                                            <Input placeholder='Fullname' onChange={onFileBioChange} />
                                            </FormControl>

                                            <FormControl mt={4} >
                                            <FormLabel>Bio</FormLabel>
                                            <Textarea value={value} onChange={onFileBioChange}   placeholder='Bio' height={40} />
                                            </FormControl>
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
                    <div className="w-full flex"> 
                        <Feed/>
                        {/* <RightBar/> */}
                        <div>
                            <div className="mb-7 px-5 mt-10 "> 
                                <div className="flex">
                                    <h4 className="text-xl font-bold mb-4">User Information</h4>  
                                    <BsPencilFill onClick={informationOpen} className="cursor-pointer"/> 
                                        <Modal
                                            // initialFocusRef={initialRef}
                                            // finalFocusRef={finalRef}
                                            isOpen={bioOpen}
                                            onClose={informationClose}
                                        >
                                            <ModalOverlay />
                                            <ModalContent>
                                            <ModalHeader>Edit Profile</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody pb={6}>
                                                <FormControl>
                                                <FormLabel>Fullname</FormLabel>
                                                <Input placeholder='Fullname' onChange={onFileBioChange} />
                                                </FormControl>

                                                <FormControl mt={4} >
                                                <FormLabel>Bio</FormLabel>
                                                <Textarea value={value} onChange={handleInputChange}   placeholder='Bio' height={40} />
                                                </FormControl>
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button onClick={onSaveDataClickBio} colorScheme='blue' mr={3}>
                                                Save
                                                </Button>
                                                <Button onClick={informationClose}>Cancel</Button>
                                            </ModalFooter>
                                            </ModalContent>
                                        </Modal>   
                                </div>
                               
                                <div>
                                    <span>City :</span>
                                    <span>Jakarta</span> 
                                </div>
                                <div>
                                    <span>Age : </span>
                                    <span>24</span> 
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Profile