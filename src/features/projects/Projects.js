import { useSelector } from "react-redux";
import { userDetails } from "../auth/authSlice";
import { ProjectContainer } from "../components/ProjectContainer";

const people = [
    {
        image: "./img/people/1.png"
    },
    {
        image: "./img/people/2.png"
    },
    {
        image: "./img/people/3.png"
    },
    {
        image: "./img/people/4.png"
    },
    {
        image: "./img/people/1.png"
    },
    {
        image: "./img/people/1.png"
    },
    {
        image: "./img/people/1.png"
    },
    {
        image: "./img/people/1.png"
    },
    {
        image: "./img/people/1.png"
    },
]
export const Projects = ()=>{
    const userDataState = useSelector(userDetails);
    return (
        <div className="px-11 pt-12 grow flex flex-col">
            <div className="flex">
                <div className="self-center flex">
                    <img src="./img/search.svg" alt="" className="self-center mr-1"/>
                    <input type="text" placeholder="Search" className="self-center py-1 px-2 focus:outline-none focus:border-[#9A9A9A] focus:ring-[#9A9A9A] focus:ring-1 rounded-sm sm:text-sm placeholder:font-poppins placeholder:text-base placeholder:text-[#9A9A9A] " />
                </div>
                <div className="self-center grow flex justify-center">
                    <div className="flex flex-row-reverse relative text-center">
                        {
                            people.length>4 &&
                            <div className="h-6 w-[18px] grow inline-block">
                                <div className="absolute h-6 w-6 border top-0.5 border-white rounded-full bg-gray-200 text-gray-400 text-base leading-[22px]">
                                    <span>{people.length}</span>
                                </div>
                            </div>
                        }
                        {
                            people.slice(0,4).reverse().map(p=>(
                                <div className="h-6 w-[18px] inline-block">
                                    <div className="absolute h-6 w-6">
                                        <img src={p.image} className={`w-6 h-6 inline`}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="self-center">
                    <span className="font-poppins text-base text-[#3A3A3A] mr-2">Hi {userDataState.userInfo.name}</span>
                    <img src={userDataState.userInfo.profileImage} alt="" className="w-11 inline"/>
                </div>
            </div>
            <div className="flex font-poppins mt-20">
                <div className="self-center font-medium text-2xl">Projects</div>
                <div className="self-center grow flex text-lg justify-end">
                    <span className="self-center mr-1">Filter</span>
                    <img className="self-center inline" src="./img/filter.svg" alt=""/>
                </div>
            </div>
            <div className="grow grid grid-cols-3 gap-10 mt-9 h-full">
                <ProjectContainer heading="To Do" status="todo"/>
                <ProjectContainer heading="In Progress" status="in progress"/>
                <ProjectContainer heading="Completed" status="completed"/>
            </div>
        </div>
    );
}