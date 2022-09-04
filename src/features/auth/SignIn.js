import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { validateSignIn } from "./authThunks";
import { status, isAuthorised, setJWT, setUserData, setStatus } from "./authSlice";
import { useDispatch } from "react-redux";

export const SignIn = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isAuthorisedState = useSelector(isAuthorised);
    const statusState = useSelector(status);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setStatus('idle'));
        document.title="Sign In";
    },[]);

    if(isAuthorisedState) return <Navigate to='/' />;

    return (
        <div className="grid grid-cols-2 pt-20 mx-32 font-poppins">
            <img src="./img/auth/auth.svg" alt="" className="h-96 self-center"/>
            <div className="self-center rounded-[65px] border-2 border-[#1A3B583D] border-opacity-25 py-20 px-16">
                <div className="flex gap-6 text-2xl text-[#1A3B58]">
                    <div className="font-medium hover:opacity-70">
                        <Link to="/signin">Log In</Link>
                        <div className="w-6 mx-1 my-2 border-2 border-[#1A3B58]"></div>
                    </div>
                    <div className="opacity-30 hover:opacity-70">
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
                <div className="mx-16 w-80">
                    <div className="w-full border border-[#4091DF1F] border-opacity-10 mt-8"></div>
                    <div className="mt-9">
                        <div className="font-medium text-xl text-[#1A3B58]">To Continue</div>
                        <div className="font-thin text-xs text-[#999999]">We need your Name & Email </div>
                    </div>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="text" className={`border ${statusState==='401' || statusState==='404' || statusState==='500' ? "border-[#F65B2A]" : "border-[#CBDBEA]"} rounded-lg py-2 px-4 w-full placeholder:font-thin mt-9`} placeholder="Email"/>
                    <div className="relative mt-9">
                        <input value={password} onChange={e=>setPassword(e.target.value)} type={passwordVisible ? "text" : "password"} className={`border ${statusState==='401' || statusState==='500' ? "border-[#F65B2A]" : "border-[#CBDBEA]"} rounded-lg py-2 px-4 w-full placeholder:font-thin`} placeholder="Password"/>
                        <img onClick={()=>{setPasswordVisible(!passwordVisible)}} src={`./img/auth/${passwordVisible ? "eye" : "eye-closed"}.svg`} alt="" className="absolute top-3 h-4 right-4"/>
                    </div>
                    {
                        statusState==='401' || statusState==='404' || statusState==='500'  ?
                        <div className="font-roboto text-[#F65B2A] text-xs text-center mt-4">
                            <img src="./img/auth/error.svg" alt="" className="inline mx-1"/>
                            {
                                statusState==='401' ?
                                <span>Your Email & Password do not match</span> :
                                statusState==='404' ?
                                <span>Please Enter a valid Email</span> :
                                <span>Oops something went wrong!</span> 
                            }
                        </div>:
                        <></>
                    }
                    <button disabled={!email || !password || statusState==='loading'} onClick={()=>{dispatch(validateSignIn({email,password,setJWT,setUserData}));}} className={`${statusState==='401' || statusState==='404' || statusState==='500' ? "mt-4" : "mt-9"} bg-[#329C89] disabled:opacity-70 hover:opacity-70 w-full rounded-lg py-2 text-white text-center font-medium mt-8`}>Log In</button>
                    <div className="mt-9">
                        <input type="checkbox" className="accent-[#329C89] ring-[#329C89]"/>
                        <span className="text-xs text-[#1A3B589C] mx-2">Remember Me!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}