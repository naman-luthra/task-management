import { setStatus } from "../auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Projects } from "../projects/Projects";
import { loadProjects } from "../projects/projectsThunks";
import { setDragged } from "../projects/projectsSlice";
export const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setStatus('idle'));
        dispatch(setDragged(null));
        dispatch(loadProjects());
        document.title="Home";
    },[]);
    return(
        <div className="flex">
            <Navbar active="Projects"/>
            <Projects />
        </div>
    );
}