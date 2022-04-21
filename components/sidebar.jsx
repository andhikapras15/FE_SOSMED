import {MdRssFeed, MdGroupAdd} from "react-icons/md" 
import {BsFillChatLeftDotsFill, BsFillCameraVideoFill, BsFillBookmarkFill, BsQuestionCircle} from "react-icons/bs" 
import Image from "next/image" 
// import styles from "../styles/global.css"

const SideBar = () => { 
    return (
        <div className="w-3/12 h-[calc(100vh-55px)] p-5 overflow-y-scroll sticky top-14">
            <ul className="p-0 m-0 list-none">
                <li className="flex items-center mb-5">
                    <MdRssFeed className="mr-4"/>
                    <span>Feed</span>
                </li>
                <li className="flex items-center mb-5">
                    <BsFillChatLeftDotsFill className="mr-4"/>
                    <span>Chats</span>
                </li>
                <li className="flex items-center mb-5">
                    <BsFillCameraVideoFill className="mr-4"/>
                    <span>Videos</span>
                </li>
                <li className="flex items-center mb-5">
                    <MdGroupAdd className="mr-4"/>
                    <span>Groups</span>
                </li>
                <li className="flex items-center mb-5">
                    <BsFillBookmarkFill className="mr-4"/>
                    <span>Bookmarks</span>
                </li>
                <li className="flex items-center mb-5">
                    <BsQuestionCircle className="mr-4"/>
                    <span>Question</span>
                </li>
            </ul> 
            <hr className="my-5"/> 
            <ul className="p-0 m-0 list-none">
                <li className="flex items-center mb-4">
                    <img src={"/profile2.jpg"} className="w-8 h-8 rounded-full object-cover mr-3"/>
                    <span>Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <img src={"/profile3.jpg"} className="w-8 h-8 rounded-full object-cover mr-3"/>
                    <span>Asep Rombeng</span>
                </li>
                <li className="flex items-center mb-4">
                    <img src={"/profile4.jpg"} className="w-8 h-8 rounded-full object-cover mr-3"/>
                    <span>Jamilah</span>
                </li>
                <li className="flex items-center mb-4">
                    <img src={"/profile5.jpg"} className="w-8 h-8 rounded-full object-cover mr-3"/>
                    <span>Dian ter</span>
                </li>
                <li className="flex items-center mb-4">
                    <img src={"/profile6.jpg"} className="w-8 h-8 rounded-full object-cover mr-3"/>
                    <span>Sholeh Peci</span>
                </li>
                <li className="flex items-center mb-4">
                    <img src={"/profile7.jpg"} className="w-8 h-8 rounded-full object-cover mr-3"/>
                    <span>Romlah</span>
                </li>
            </ul>
        </div>
    )
} 

export default SideBar