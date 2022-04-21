import  Header  from "../components/header" 
import  SideBar from "../components/sidebar"
import  Feed  from "../components/feed" 
import RightBar from "../components/rightBar" 

const Home = () => {
    return (
        <div>
            <Header/>
            <div className="flex">
                <SideBar/>
                <Feed/>
                <RightBar/>
            </div>
        </div>
    )
}

export default Home