import Image from "next/image" 
import gift from '../public/gift.png'
import iklan1 from '../public/iklan1.jpg'
import profile2 from '../public/profile2.jpg' 
import { toast } from "react-toastify"
import useUser from '../hooks/useUser' 
import { Button } from "@chakra-ui/react"


const RightBar = () => {  

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
    const {isVerified, bio, fullname, profilepic, username, email,id} = useUser()  

    return (
        <div className="min-w-[4/12] pt-5 pr-1 pl-2 ">
            <div className="flex"> 
                <div className="w-10 h-10 mr-2"> 
                    <Image className="-z-50" src={gift} />
                </div>
                <span className="font-light text-sm"><b>Asep Kopling</b> and <b>3 other friends</b> have a birthday today</span>
            </div> 
            <div className="max-w-xs my-7 ">
                <Image className="rounded-xl -z-50" src={iklan1} />
            </div>
            <h4 className="font-semibold mb-5">Online Friends</h4>
            <ul className="m-0 p-0 list-none">
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10  object-cover">
                            <Image className="w-[32px] h-[32px] object-cover rounded-full -z-50" src={profile2} />
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10 rounded-full object-cover">
                            <Image className="w-[32px] h-[32px] rounded-full -z-50" src={profile2} />
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                    <div className="w-10 h-10 rounded-full object-cover">
                        <Image className="w-[32px] h-[32px] rounded-full -z-50" src={profile2} />
                    </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10 rounded-full object-cover">
                            <Image className="w-[32px] h-[32px] rounded-full -z-50" src={profile2}/>
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10 rounded-full object-cover">
                            <Image className="w-[32px] h-[32px] rounded-full -z-50" src={profile2} />
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
            </ul> 
            {/* {!isVerified ? (
            <div className="p-5">
                <p className="mb-2">
                    Please Verify Your Email Account !
                </p>
                <Button className="-z-50 cursor-pointer" onClick={sendEmailVerified}>Send Email Verified</Button>
            </div>):null} */}
        </div>
    )
} 

export default RightBar