import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragged, projectsData, setDragged, setProjectStatus, setStatus } from "../projects/projectsSlice";
import { addProject, updateProjectStatus } from "../projects/projectsThunks";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { status as loadStatusSlice } from "../projects/projectsSlice";


export const ProjectContainer = ({heading,status})=>{
    const projectsArr = useSelector(projectsData);
    const projects = projectsArr.filter(project=>project.status===status);
    const [adding,setAdding] = useState(false);
    const [dragging,setDragging] = useState(false);
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const loadStatus = useSelector(loadStatusSlice)
    const dispatch = useDispatch();
    const draggedState = useSelector(dragged);

    return (
        <div className={`bg-[#F5F9F9] rounded-2xl p-5`} onDragEnter={()=>{setDragging(true)}} onDragLeave={()=>setDragging(false)} 
        onDrop={()=>{
            dispatch(updateProjectStatus({status}));
            dispatch(setProjectStatus(status));
            setDragging(false);
        }} onDragOver={(e)=>e.preventDefault()}>
            <div className="font-medium text-sm flex">
                <div className="font-poppins text-[#212121] grow">{heading}</div>
                <div className="py-1 px-2 bg-[#ECF3F3] text-[#329C89] rounded-lg">{projects.length}</div>
            </div>
            <div onClick={()=>setAdding(true)} className={`bg-[#ECF3F3] ${adding && "opacity-70"} cursor-pointer hover:opacity-70 rounded-lg mt-6 p-2 text-center`}>
                {
                    loadStatus==="loading" || loadStatus===`adding-${status}` ?
                    <AiOutlineLoading3Quarters className="text-[#329C89] inline animate-spin"/> :
                    <img src="./img/plus.svg" className="inline"/>
                }
            </div>
            {
                adding &&
                <div className="bg-white px-[18.5px] py-[21.5px] font-poppins mt-6 rounded-lg w-full">
                    <input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="Give your task a title" className="w-full py-1 px-2 focus:outline-none focus:border-[#9A9A9A] focus:ring-[#9A9A9A] focus:ring-1 rounded-sm text-sm placeholder:font-poppins placeholder:text-sm font-medium placeholder:font-medium placeholder:text-[#A4ABB3] " />
                    <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description..." className="w-full mt-2 py-1 px-2 focus:outline-none focus:border-[#9A9A9A] focus:ring-[#9A9A9A] focus:ring-1 rounded-sm text-xs text-[#6B6B6B] placeholder:font-poppins placeholder:text-xs placeholder:text-[#A4ABB3] "/>
                    <div className="flex mt-3">
                        <button onClick={()=>{
                            dispatch(addProject({title,description,status}));
                            dispatch(setStatus('adding-'+status));
                            setTitle("");
                            setDescription("");
                            setAdding(false);
                        }} className="h-7 w-7 border border-dashed border-[#E1E1E1] rounded-full hover:bg-[#F5F9F9]" alt="">
                            <img src="./img/plus.svg" alt="" className="inline"/>
                        </button>
                    </div>
                </div>
            }
            {
                projects.map(project=>(
                    <div key={project._id} onDragStart={(e)=>{
                        dispatch(setDragged({projectId: project._id, containerStatus: status}));
                    }} className={`${draggedState && draggedState.projectId!=project._id ? "pointer-events-none" : ""} bg-white px-[18.5px] py-[21.5px] font-poppins mt-6 rounded-lg w-full`} draggable>
                        <div className="font-medium text-sm text-[#212121]">{project.title}</div>
                        <div className="text-xs text-[#6B6B6B] mt-4">{project.description}</div>
                        <div className="flex mt-6">
                            <img src={project.author.profileImage} className="h-7 w-7" alt=""/>
                        </div>
                    </div>
                ))
            }
            {
                dragging &&
                <div className="mt-7 border-2 border-dashed border-[#D6E0E0] w-full h-40 rounded-lg pointer-events-none"></div>
            }
        </div>
    );
}