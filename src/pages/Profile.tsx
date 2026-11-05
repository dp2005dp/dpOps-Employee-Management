import type { ElementType } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Cards from "../components/Cards";
import { CgPoll } from "react-icons/cg";
import { RiContractFill } from "react-icons/ri";
import type { EmployeeInterface , EmployeeProjectsInterface} from "../mockdata/mockdata";
import { FaWarehouse } from "react-icons/fa";
import PageLoader from "../components/PageLoader";
import PageNotFound from "../components/PageNotFound";
import { useEmployeeData } from "../components/EmployeeDataLayout";
const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

const Profile = () => {
  const {data , status , projects} = useEmployeeData()
    
   
const pageRender = () => {
    switch(status) {
       case renderState.loading : 
       return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
      
       case renderState.success : 
       return <ProfileDetails data={data} projects={projects}/>
 
      case renderState.failure :
      return  <PageNotFound />
      
      default :
      return null
    }
}

    return (
      <div className="h-[calc(100dvh-80px)] pb-5 overflow-y-auto hide-scrollbar scrollbar-smooth p-5">
        <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">My Profile</h1>
        {pageRender()}
      </div>
    )
}


interface profileProps {
  data : EmployeeInterface | undefined,
  projects : EmployeeProjectsInterface[]
}

const ProfileDetails = ({data , projects} : profileProps) => {
      
  const configDate = (date:string) => {
      return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric", 
    });
  }


  return (
         <>
         <div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           
           <div className="shadow-md mt-5 bg-[#ffffff] rounded-[8px] p-5">
            <div className="xl:flex items-start gap-5">
                <img src={`${import.meta.env.VITE_IMAGE_URL}${data?.profilePhoto}`}
                  className="h-[95px]  w-[95px] rounded-full object-cover object-top"
                />
                <div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:gap-5">
                   <h1 className="text-[#000000] mt-2 xl:mt-2 font-dm-bold text-[20px]">{data?.fullName}</h1>
                   <div className="bg-[#4f7cff]/20  rounded-[20px] md:w-[60%] w-[75%] p-2 xl:w-[100%] xl:flex flex-col justify-center items-center">
                     <p className="text-[#4f7cff] md:tracking-[-1px] text-[12px] text-[clamp(14px,3vw,16px)] font-dm-medium">{data?.role}</p>        
                     </div>
                </div>
                
                <div className="mt-2">
              
                    <div className="flex items-center gap-5">
                          <div className={`flex mt-2 items-center h-[25px] w-[80px] gap-2 rounded-[20px] p-2 ${'Active' === 'Active' ? 'bg-[#16a05a]/20' : 'bg-[#f5b73b]/30'}`}>
                             <div className={`h-[10px] w-[10px] rounded-full ${'Active' === 'Active' ? 'bg-[#16a05a]' : 'bg-[#f5b73b]'}`}/>
                             <p className={`${'Active' === 'Active' ? 'text-[#16a05a]' : 'text-[#f5b73b]'} font-dm-medium text-[12px] `}>Active</p>
                       </div>
                    
                     <p className="text-gray-600 text-[16px] mt-3 font-dm-medium">{data?.username}</p> 
                    </div>
                      

                <div className="mt-3">
                   <div className="flex items-center mt-5 mb-1 gap-3">
                        <IoMail  className="h-[20px]  w-[20px] text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[16px] font-dm-regular">{data?.email}</p>
                   </div>

                   <div className="flex items-center gap-3 mt-3 mb-1">
                        <FaPhoneAlt   className="h-[20px] w-[20px]  text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[16px] font-dm-regular">{data?.phone}</p>
                   </div>

                   <div className="flex items-center gap-3 mt-3 mb-1">
                        <FaLocationDot className="h-[20px] w-[20px] mt-2 mb-1 text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[16px] font-dm-regular">{data?.streetAddress},{data?.state}</p>
                   </div>
             </div>
                </div>
            </div>
            </div>

            
           </div>  
            
            <div className="mt-5 shadow-md bg-[#ffffff] rounded-[8px] p-2">
            <CardsContainer tProjects={projects.length} pendindProjects={projects.filter(pp => pp.roleStatus === 'Pending').length} activeProjects={projects.filter(pp => pp.roleStatus === 'In Progress').length} reports={5}/>
             </div>
          </div>

             
        <div className="shadow-md mt-5 bg-[#ffffff] rounded-[8px] p-5">
           <div>
               <p className="text-[#7A4CF5] text-[22px] text-[clamp(20px,3.5vw,22px)] mb-3 font-dm-bold">Overview</p>
           </div>
            
           <div className="grid grid-cols-1 xl:grid-cols-2 mb-3 gap-5">
                <div className="xl:h-[200px] w-[100%]  ring-2 ring-[#4f7cff]/20 rounded-[8px] p-3">
                    <h1 className="text-[20px] mb-2 font-dm-medium font-[#000000] text-[clamp(20px,3.5vw,22px)]">About</h1>
                    <p className="text-gray-600 text-[18px] text-[clamp(16px,3vw,18px)] font-dm-regular">{data?.aboutEmployee}</p>
                </div>
                
                <div className=" xl:h-[200px] w-[100%]  ring-2 ring-[#4f7cff]/20 rounded-[8px] p-3">
                    <Reusebles 
                    icon={FaCalendarAlt}
                    title="Join Data"
                    value={configDate(String(data?.joinDate))}
                    />

                     <Reusebles 
                    icon={BsFillBriefcaseFill}
                    title="Experience"
                    value={String(data?.experienceYears).split('.')[0]}
                    />

                     <Reusebles 
                    icon={FaWarehouse}
                    title="Department"
                    value={String(data?.department)}
                    />
                </div>

           </div>
        </div>  
           
         </div>
         </>
  )
}


interface resubleProps {
    icon : ElementType,
    title : string,
    value : string
}

const Reusebles = (
 
   { icon : Icon,
    title,
    value}
:
 resubleProps
) => {
   return (
       <div className="flex mt-3 items-start gap-3">
           <Icon className ="text-[20px] w-[20px] text-[#7A4CF5]"/>
            <div>
                <h1 className="text-gray-500 text-[14px] font-dm-regular">{title}</h1>
                <p  className="text-[#000000] text-[15px] font-dm-medium">{value}</p>
            </div>
       </div>
   )
}

interface CartsProps {
  tProjects : number
  activeProjects : number
  reports : number
  pendindProjects : number
}

const CardsContainer = ({tProjects , activeProjects , reports , pendindProjects} : CartsProps ) => {
    

   return (
        <div className="mt-5 mb-2 grid grid-cols-1 xl:grid-cols-2  gap-5">
        <Cards 
          Icon={RiContractFill }
          title  = 'Total Projects'
          value  = {tProjects}
          color  = '#5F23AF '
        />

         <Cards 
          Icon  ={CgPoll}
          title  = 'Reports Submits'
          value  = {reports}
          color  = '#16a05a'
        />
        
        <Cards 
          Icon  ={CgPoll}
          title  = 'Active Projects'
          value  = {activeProjects}
          color  = '#4f7cff'
        />

        <Cards 
          Icon  ={CgPoll}
          title  = 'Pending Projects'
          value  = {pendindProjects}
          color  = '#f5b73b'
        />
       </div>
   )
}
export default Profile;