import { MdDashboard } from "react-icons/md";
import { FaDiagramProject } from "react-icons/fa6";
import { NavLink , useLocation } from "react-router-dom";
import { BiLogoOpera } from "react-icons/bi";
import { MdOutlineUpdate } from "react-icons/md";
import { TbReportAnalyticsFilled } from "react-icons/tb";
import { BsPersonRolodex } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

const navItems= [
    {
        id : 0,
        name : 'Dasboard',
        link : '/',
        icons : MdDashboard,
        subLink : []
    },
    {
        id : 1,
        name : 'Update Project Status',
        link : '/UpdateStatus',
        icons : MdOutlineUpdate,
         subLink : []
    },
    {
        id : 2,
        name : 'My Projects',
        link : '/projects',
        icons : FaDiagramProject,
        subLink : ['/addnewproject' , '/projectDetails/:id']
    },
     {
        id : 3,
        name : 'Submit Reports',
        link : '/reports',
        icons : TbReportAnalyticsFilled,
        subLink : []
    },
     {
        id : 4,
        name : 'My Profile',
        link : '/profile',
        icons : BsPersonRolodex,
        subLink : []
    },

]

const Navbar = () => {
     const activeNav = useLocation()
     const navigate = useNavigate()
     
     const onLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
   <nav className="bg-[#051933] w-[300px] h-screen flex flex-col justify-between p-4 ">
     <div>
       <div className="flex items-start  gap-3">
           <div className="flex flex-col items-center justify-center h-[40px] w-[50px] rounded-[5px] bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff]">
                  <BiLogoOpera className="h-[20px] w-[20px] text-white"/>
                  </div>
                 
                <div>

                
                 <h1 className="md:text-[35px] text-[clamp(24px,8vw,28px)] text-[#ffffff]  font-heading">DpOps</h1>
                  <p className="md:text-[15px] text-[clamp(14px,3.5vw,15px)] mt-2 leading-[100%] text-[#ffffff] font-dm-regular">Project Management SaaS platform</p>
                </div>
       </div>
     
     <div className="mt-10">
{/* bg-[#112F62] */}
       {
        navItems.map(eachItem =>{
            const Iocn = eachItem.icons
            return (
        <NavLink
            to={eachItem.link}
            className={`flex p-3 mt-3 mb-3 h-[40px] items-center
                ${
                eachItem.link === activeNav.pathname ||
                eachItem.subLink.some((link) =>
                    link.includes(":id")
                    ? activeNav.pathname.startsWith(link.replace("/:id", "/"))
                    : link === activeNav.pathname
                )
                    ? "bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff]"
                    : "hover:bg-[#9aa3c7]/20 hover:scale-105 transition duration-300 ease-in-out"
                }
                cursor-pointer rounded-[3px] shadow-lg gap-3`}
            key={eachItem.id}
            >
            <Iocn className="text-[#ffffff] h-[20px] w-[30px]" />
            <p className="text-[18px] text-[clamp(16px,3.5vw,18px)] text-[#ffffff] font-dm-regular">
                {eachItem.name}
            </p>
        </NavLink>
        )})
       }

        </div>
      </div>

       <button className="flex p-2 items-center mt-5 md:mt-0 shadow-xl gap-1 flex flex-col justify-center items-center bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] transition duration-300 ease-in-out cursor-pointer hover:scale-95 rounded-[3px] h-[40px] w-[180px]"
                onClick={onLogout}
                >
                <div className="flex items-center gap-2">
                  <IoLogOut className="h-[20px]  w-[20px] text-[#ffffff]"/>
                  <p className="text-[#ffffff] md:text-[18px] text-[clamp(14px,3.2vw,16px)]  tracking-[-0.5px] font-dm-medium">Logout</p>
                </div>
            </button>
   </nav>
)
}
export default Navbar;