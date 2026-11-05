import { useState  , useEffect} from "react";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate , useParams} from "react-router-dom";
import type { ProjectInterface , assignProjectmembers } from "../mockdata/mockdata";
import type { IconType} from 'react-icons'
import { MdOutlineCalendarMonth } from "react-icons/md";
import { LuCalendarFold } from "react-icons/lu";
import { FaRegFlag } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { FaRegFileCode } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { employeesServices } from "../../services/employeeSerives";
import ProjectTypeIcons from "../components/ProjectTypeIcons";
import PageLoader from "../components/PageLoader";
import PageNotFound from "../components/PageNotFound";
const renderState = {
  loading : 'Loading',
  success : 'Success',
  failure : 'Failure'
}

const ProjectDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [data , setProjectData] = useState<ProjectInterface>()
    const [assignMembers , setMembers] = useState<assignProjectmembers[]>([])
    const [status , setStateStaus] = useState(renderState.loading)
    
    
    const fetchData = async () => {
         
        try {
            setStateStaus(renderState.loading)
            const [resProject , resMembers] = await Promise.all([employeesServices.ProjectDetails(Number(id)) , employeesServices.getEmployess(Number(id))]) 
            
            if (resProject.status === 200 && resMembers.status === 200) {
              setProjectData(resProject.data.data)
              setMembers(resMembers.data.data)
              setStateStaus(renderState.success)
            }
            
            
        }
        catch(e){
            setStateStaus(renderState.failure)
        }
     
    }
   

    useEffect(() => {
        fetchData()
    } , [id])
    
 const pageRender = () => {
    switch(status) {
       case renderState.loading : 
       return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
      
       case renderState.success : 
       return <ProjectDetailsJsx data={data} assignMembers={assignMembers}/>
 
      case renderState.failure :
     return  <PageNotFound />
      
      default :
      return null
    }
}


    return (
         <div className="h-[calc(100dvh-80px)]  md:p-5 shadow-md overflow-y-auto scrollbar-smooth hide-scrollbar p-3">
            <div className="md:m-5"> 
               <button className="h-[40px] p-3 mb-15 flex items-center gap-3 w-[100px] transition duration-300 ease-in-out bg-white rounded-[10px] cursor-pointer hover:scale-95  hover:border-1 border-[#7A4CF5] text-[#7A4CF5] font-dm-medium shadow-xl"
                    onClick={() => navigate('/projects')}
                >
                <LuMoveLeft className="h-[20px] w-[20px]"/>   <p> Back</p>
            </button>
             
              {pageRender()}
            
            </div> 
           </div>

       
           

    )
}

interface ProjectProps {
  data : ProjectInterface | undefined
  assignMembers  : assignProjectmembers[]
}

const ProjectDetailsJsx = ({data , assignMembers} : ProjectProps) => {
  const formatDate = (date?: string) => {
    if (!date) return "";
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric", 
      });
    }; 
   return (
      <div>
            <div className="mb-5">
                  <div className="flex items-start gap-3">
                            <ProjectTypeIcons value={String(data?.projectType)}/>
                            <div>
                            <h1 className="text-[#00000] text-[clamp(20px,5vw,24px)] font-dm-bold text-[30px]">{data?.projectName}</h1>
                           <p className="text-gray-500 font-dm-regular text-[clamp(16px,4vw,18px)] text-[20px]">{data?.projectType} . {data?.ClientCompany}</p>      
                          </div>
                       </div>
              </div>
           
           <div className="grid grid-cols-1 xl:grid-cols-2  md:gap-10">
             
             <div className=" mb-2 xl:col-span-1  rounded-[10px] bg-[#ffffff] shadow-md 2xl:h-[200px] p-3 lg:p-5">
               <div className="flex items-start gap-2 md:gap-3 ">
                        <FaRegFileCode className={` h-[25px] w-[25px]` }
                        style={{color : '#7A4CF5'}}
                        />
                <div>
                    <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Project Descripition</h1>
                    <p className="text-gray-600 font-dm-regular text-[clamp(16px,3.5vw,18px)] text-[18px]">{data?.projectDescription}</p>
                </div>
      
                </div>
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-1 md:grid-cols-2   md:gap-5">
             <div className="mb-2 p-5  rounded-[10px] bg-[#ffffff] shadow-md ">
                <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Project Date</h1>
                <ClientDetails value={formatDate(data?.startDate)} title='Start Date' color="#108893" Icon={MdOutlineCalendarMonth}/>
                <ClientDetails value={formatDate(data?.deadline)} title="End Date"  color="#19D4E6" Icon={LuCalendarFold}/>
            </div>

             <div className="mb-2 p-5  rounded-[10px] bg-[#ffffff] shadow-md ">
                <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">ProjectType & Prority</h1>
                <ClientDetails value={data?.priority} title='Priority' color="#BC1515" Icon={FaRegFlag}/>
                <ClientDetails value={data?.projectType} title='Project Type' color="#7A4CF5" Icon={FaCode}/>
    
            </div>
            </div>
            </div>
            </div>
           
           
           <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
          
            
            </div>
            
            <div className="md:flex items-center  flex-wrap gap-8">
             <div className="mb-5 mt-2 p-3 rounded-[10px] w-full bg-[#ffffff] shadow-md ">
                 <div className="flex items-start gap-3 pl-5">
                    <MdOutlinePeopleAlt className="h-[25px] w-[25px] text-[#7A4CF5]"/>
                    <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Contribution Members ({assignMembers.length})</h1>
                 </div>
                  
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
                  {
                    assignMembers.map(eachMembers => (
                         <div key={eachMembers.roleName} className="flex flex-col items-center">
                             <img src={`${import.meta.env.VITE_IMAGE_URL}${eachMembers.profilePhoto}`} 
                              className="h-[65px] w-[65px] rounded-full mb-3 object-cover object-top" alt="profile"
                             />
                            <h1 className="text-[19px] text-center font-dm-medium mb-2 text-[#000000]">{eachMembers.fullName}</h1>
                            <p className="text-gray-600 text-center font-dm-regular text-[16px]">{eachMembers.assignedRole}</p>
                         </div>
                    ))
                  }
                </div>
             </div>
              
            

            </div>
      </div>
   )
}






interface ClientdetailsProps {
   Icon : IconType,
   title : string | undefined,
   value :string  | undefined,
   color : string
}

const ClientDetails = ({Icon , value , title, color} : ClientdetailsProps) => (
     <div className="flex items-center mt-3 gap-3">
        <div className="h-[40px] w-[40px] rounded-full bg-[#F6F8FD] flex flex-col justify-center items-center">
             <Icon className={`h-[20px] w-[20px]` }
             style={{color : color}}
             />
       </div>
     
     <div>
         { 
            title && (
                  <h1 className="text-[19px] font-dm-medium text-[#000000]">{title}</h1>
            )
         }
         <p className="text-gray-500 font-dm-regular text-[16px]">{value}</p>
     </div>
      
     </div>
)

export default ProjectDetails;