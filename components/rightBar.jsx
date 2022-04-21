import Image from "next/image" 
import gift from '../public/gift.png'
import iklan1 from '../public/iklan1.jpg'
import profile2 from '../public/profile2.jpg'


const RightBar = () => { 
    return (
        <div className="min-w-[4/12] pt-5 pr-1 pl-2 ">
            <div className="flex"> 
                <div className="w-10 h-10 mr-2"> 
                    <Image src={gift} />
                </div>
                <span className="font-light text-sm"><b>Asep Kopling</b> and <b>3 other friends</b> have a birthday today</span>
            </div> 
            <div className="max-w-xs rounded-xl my-7">
                <Image src={iklan1} />
            </div>
            <h4 className="font-semibold mb-5">Online Friends</h4>
            <ul className="m-0 p-0 list-none">
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10 rounded-full object-cover">
                            <Image src={profile2} />
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10 rounded-full object-cover">
                            <Image src={profile2} />
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                    <div className="w-10 h-10 rounded-full object-cover">
                        <Image src={profile2} />
                    </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10 rounded-full object-cover">
                            <Image src={profile2}/>
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
                <li className="flex items-center mb-4">
                    <div className="mr-3 relative flex"> 
                        <div className="w-10 h-10 rounded-full object-cover">
                            <Image src={profile2} />
                        </div>
                        <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[-2px] right-0 border-2 border-white"></span>
                    </div> 
                    <span className="font-medium">Mamat Kopling</span>
                </li>
            </ul>
        </div>
    )
} 

export default RightBar