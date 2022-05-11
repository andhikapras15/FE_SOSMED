import {BsSearch, BsFillPersonFill, BsFillChatLeftTextFill, } from "react-icons/bs" 
import {AiOutlineNotification} from "react-icons/ai" 
import Image from "next/image"  
import Link from "next/link"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Router from "next/router" 
import Cookies from 'js-cookie' 
import useUser from "../hooks/useUser" 
import { API_URL } from "../helpers"
import { useDispatch } from "react-redux"

const Header = () => { 
    const dispatch = useDispatch()

    const logOutClick = async() => {
        Cookies.remove('token')
        await Router.push('/login') 
        
    }  

    const {profilepic} = useUser()
    const avatar = profilepic ? `${API_URL+profilepic}` : `${API_URL}/avatar.jpg`

    return (
        <div className="w-full h-[55px] flex items-center px-10 py-4 bg-purple-600 sticky top-0">
            <div className="basis-2/12 "> 
                <Link href={'/home'}>
                    <span className="text-3xl font-bold text-white cursor-pointer">Social Media</span>
                </Link>
            </div> 
            <div className="basis-5/12 h-6 flex ">
                <div className="w-96 ml-32 flex h-6 bg-white rounded-full items-center">
                    <BsSearch className="text-sm ml-2 mr-2"/>
                    <input placeholder="Search for friend" className="border-0 focus:outline-none text-xs w-[80%]"/>
                </div>
            </div>
            <div className="basis-5/12 flex items-center justify-around text-white ">
                <div className="text-sm cursor-pointer">
                    <span className="mr-3">Homepage</span>
                    <span>Timeline</span>
                </div> 
                <div className="flex text-sm">
                    <div className="flex mr-4">
                        <BsFillPersonFill/>
                        <span>1</span>
                    </div>
                    <div className="flex mr-4">
                        <BsFillChatLeftTextFill/>
                        <span>2</span>
                    </div>
                    <div className="flex mr-4">
                        <AiOutlineNotification/>
                        <span>3</span>
                    </div>
                </div>  
                {/* <Link href='/profile'> */} 
                <Menu>
                    <MenuButton>
                        <img src={avatar} className="w-[32px] h-[32px] rounded-full object-cover cursor-pointer"/>
                    </MenuButton>
                    <MenuList>
                        <Link href="/profile">
                            <MenuItem textColor="black">profile</MenuItem>
                        </Link>
                        <MenuItem textColor="black" onClick={logOutClick}>Log Out</MenuItem>
                    </MenuList>
                </Menu>
                {/* </Link> */}
            </div>
        </div>
    )
} 

export default Header