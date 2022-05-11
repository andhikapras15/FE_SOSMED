import {MdPermMedia, MdLocationOn, MdEmojiEmotions} from "react-icons/md" 
import {BsFillTagFill} from "react-icons/bs" 
import Image from "next/dist/client/image" 
import { useState } from "react"
import { postActions } from "../redux/actions/postActions"
import axios from "axios"
import { API_URL } from "../helpers" 
import Cookies from "js-cookie"
import useUser from '../hooks/useUser' 


const Share = () => {  
    const {isVerified, profilepic, isLogin} = useUser() 
    const avatar = profilepic ? `${API_URL+profilepic}` : `${API_URL}/avatar.jpg`

    const [input,setInput] = useState({
        caption:""
    })

    const [selectedImage,setelectedImage] = useState({
        file:[], 
        filePreview: null
    })

    const onFilePostChange = (e) => {
        console.log(e.target.files[0])
        if(e.target && e.target.files[0]){
            setelectedImage({...selectedImage,file:e.target.files[0],filePreview:URL.createObjectURL(e.target.files[0])})
        }
    }  
    
    const onFileCaptionChange = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }

    // const savePostClick = async (e) => {
    //     e.preventDefault() 
    //     postActions(input) 
    //     console.log(input)
    // } 
    const onSavePostClick =async () => {
        let token = Cookies.get('token')  
        const formData = new FormData() 

        formData.append(`post`,selectedImage.file) 
        formData.append('caption', input.caption) 

        try { 
            await axios.post(`${API_URL}/post/post`,formData,{
                headers: { 
                    authorization: `bearer ${token}`
                }
            })
        } catch (error) { 
            console.log(error) 
        }
    }

    return (
        <div className="w-full min-sh-44 rounded-xl shadow-xl p-3 ">
            <div className="flex items-center"> 
                <img src={avatar} className="w-12 h-12 rounded-full object-cover mr-3"/> 
                <input placeholder="What's in your mind ?" name="caption" value={input.caption} className="border-0 w-[80%] focus:outline-none" onChange={onFileCaptionChange}/>
            </div> 
            <hr className="m-5"/>
            <div className="flex items-center justify-between">
                <div className="flex items-center ml-5  cursor-pointer">  
                    <label for="postimage">
                        <input type="file" id="postimage" accept=".gif,.jpg,.jpeg,.png" hidden onChange={onFilePostChange}></input>
                        <MdPermMedia className="text-lg mr-1 text-red-400 cursor-pointer"/> 
                        {/* {postimage && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" /> : null}
                        {!postimage && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" /> : null} */}
                    </label>
                    <span className="text-sm font-medium">Photo or Video</span>
                </div> 
                <div className="flex items-center cursor-pointer"> 
                    <BsFillTagFill className="text-lg mr-1"/>
                    <span className="text-sm font-medium">Tag</span>
                </div>
                <div className="flex items-center cursor-pointer"> 
                    <MdLocationOn className="text-lg mr-1"/>
                    <span className="text-sm font-medium">Location</span>
                </div>
                <div className="flex items-center cursor-pointer"> 
                    <MdEmojiEmotions className="text-lg mr-1"/>
                    <span className="text-sm font-medium">Feelings</span>
                </div>
                {isVerified === 0 ? null : <button className="border-0 p-2 rounded-md bg-green-500 font-medium mr-5 text-white" onClick={onSavePostClick}>Share</button>}
            </div>
        </div>
    )
}

export default Share