import Post from "./post"
import Share from "./share"

const Feed = () => { 
    return (
        <div className="max-w-xl p-5">
            <Share/> 
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
} 

export default Feed