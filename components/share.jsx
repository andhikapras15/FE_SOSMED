import {MdPermMedia, MdLocationOn, MdEmojiEmotions} from "react-icons/md" 
import {BsFillTagFill} from "react-icons/bs" 
import Image from "next/dist/client/image"

const Share = () => {
    return (
        <div className="w-full h-44 rounded-xl shadow-xl p-3 ">
            <div className="flex items-center"> 
                <img src={"/profile1.jpg"} className="w-12 h-12 rounded-full object-cover mr-3"/> 
                <input placeholder="What's in your mind ?" className="border-0 w-[80%] focus:outline-none"/>
            </div> 
            <hr className="m-5"/>
            <div className="flex items-center justify-between">
                <div className="flex items-center ml-5  cursor-pointer"> 
                    <MdPermMedia className="text-lg mr-1 text-red-400"/>
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
                <button className="border-0 p-2 rounded-md bg-green-500 font-medium mr-5 text-white">Share</button>
            </div>
        </div>
    )
}

export default Share