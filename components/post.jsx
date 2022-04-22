import {MdMoreVert} from "react-icons/md" 
import Image from "next/image"   
import heart from '../public/heart.png' 
import like from '../public/like.png'

const Post = ({post}) => {  

    
    

     return(
         <div className="w-full rounded-xl shadow-xl p-3 mt-8">
             <div className="flex items-center justify-between">
                <div className="flex items-center"> 
                    <img src={"/profile1.jpg"} className="w-8 h-8 rounded-full object-cover"/>
                    <span className="text-base font-medium mx-3">Andhika</span>
                    <span className="text-xs">5 Minutes Ago</span>
                </div> 
                <div> 
                    <MdMoreVert/>
                </div>
             </div>
             <div className="my-5"> 
                <span>Healing dulu bro</span> 
                <img src={"/pantai.jpg"} className="mt-5 w-full max-h-[500px] object-contain"/>
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

 export default Post