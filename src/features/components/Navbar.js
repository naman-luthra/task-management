export const Navbar = ({active})=>{
    return(
        <div className="pt-12 pl-12 h-screen border-r-[1.5px] border-[#F0F0F0]">
            <div className="font-poppins font-medium text-xl">.taskez</div>
            <div className="mt-20 w-64 font-poppins font-base">
                <div className={`${active==='Overview' ? "text-black font-medium" : "text-[#9A9A9A]"} flex mt-8`}>
                    <img src="./img/navbar/home.svg" alt="" className="self-center inline mr-7 h-5" />
                    <span className="self-center text-base">Overview</span>
                </div>
                <div className={`${active==='Stats' ? "text-black font-medium" : "text-[#9A9A9A]"} flex mt-8`}>
                    <img src="./img/navbar/stats.svg" alt="" className="self-center inline mr-7 h-5" />
                    <span className="self-center text-base">Stats</span>
                </div>
                <div className={`${active==='Projects' ? "text-black font-medium border-r-4 border-[#329C89]" : "text-[#9A9A9A]"} flex mt-8`}>
                    <img src="./img/navbar/projects.svg" alt="" className="self-center inline mr-7 h-5" />
                    <span className="self-center text-base">Projects</span>
                </div>
                <div className={`${active==='Chat' ? "text-black font-medium" : "text-[#9A9A9A]"} flex mt-8`}>
                    <img src="./img/navbar/chat.svg" alt="" className="self-center inline mr-7 h-5" />
                    <span className="self-center text-base">Chat</span>
                </div>
                <div className={`${active==='Calendar' ? "text-black font-medium" : "text-[#9A9A9A]"} flex mt-8`}>
                    <img src="./img/navbar/calendar.svg" alt="" className="self-center inline mr-7 h-5" />
                    <span className="self-center text-base">Calendar</span>
                </div>
            </div>
            <div className="mt-64">
                <div className={`${active==='Settings' ? "text-black font-medium" : "text-[#9A9A9A]"} flex mt-8`}>
                    <img src="./img/navbar/settings.svg" alt="" className="self-center inline mr-7 h-5" />
                    <span className="self-center text-base">Settings</span>
                </div>
                <div className={`${active==='LogOut' ? "text-black font-medium" : "text-[#9A9A9A]"} flex mt-8`}>
                    <img src="./img/navbar/logout.svg" alt="" className="self-center inline mr-7 h-5" />
                    <span className="self-center text-base">Log Out</span>
                </div>
            </div>
        </div>
    );
}