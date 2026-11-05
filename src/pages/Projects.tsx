import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate , useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import DropDown from "../components/DropDown";
import { useState} from "react";
import type {EmployeeProjectsInterface} from "../mockdata/mockdata"
import Status from "../components/Status";
import Prograss from "../components/Prograss";
import ProjectTypeIcons from "../components/ProjectTypeIcons";
import Nodata from "../components/Nodata";
import PageLoader from "../components/PageLoader";
import PageNotFound from "../components/PageNotFound";
import EmptyState from "../components/EmptyState";
import AddProjectsData from "../assets/AddProjectsData.png"
import { useEmployeeData } from "../components/EmployeeDataLayout";

const StatusObaject = [
    "All", "In Progress",  "Completed" , "Planning" , "Pending" , "Delayed" , "Not Started"
]

const projectColumnName = [
  'Project',
  'Progress',
  'Status',
  'Due date',
  'Actions'
]

const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

interface ProjectsProps{
  projectData : EmployeeProjectsInterface[]
}

export const ProjectsStatus = ({projectData}: ProjectsProps) => {
  
  const navigation = useNavigate()
  const location = useLocation()
  const [userInput ,setInput] = useState<string>('')
  const [filterStatus , setStatus] = useState<string>('All')
  
  const FilterStatus = (_name : string , value :string) => {
       setStatus(value)
  }

  const renderProjectData = location.pathname === '/projects' ? projectData : projectData.slice(0,3)
  
  const configDate = (date:string) => {
    return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric", 
  });
  }

  const filterData = () => {
     const filters = filterStatus === 'All' ? renderProjectData.filter(eachdata => eachdata.projectName.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())) :   renderProjectData.filter(eachData => eachData.roleStatus === filterStatus).filter(eachdata => eachdata.projectName.toLocaleLowerCase().includes(userInput.toLocaleLowerCase()))

    return filters
  }

    return ( 
            <>
            {
              projectData.length === 0 ?  <EmptyState  title="No Projects Yet" value="Please wait for your administrator to assign one." 
      image={AddProjectsData}
      /> : 
      

           <div className="mt-3 shadow-md bg-[#ffffff] p-5 md:p-10 rounded-[8px]">
          
              <div className="3xl:flex items-center gap-3 justify-between">
                    <p className="md:text-[18px] text-[clamp(15px,4vw,18px)] font-dm-regular text-[#000000]">Track and manage every project.</p>
                   {
                    location.pathname === '/projects' ? <div className="md:flex mt-5 3xl:mt-0 items-center justify-between gap-5">
                      <div className="md:flex items-center gap-5">
                          <div className="h-[35px] w-[250px]  border-1 border-gray-200 bg-white p-5 rounded-[5px] flex items-center gap-3">
                              <IoIosSearch className="h-[20px] w-[20px] text-gray-400"/>
                              
                              <input type="search" 
                                  className="outline-none w-[250px] text-[15px] font-dm-regular"
                                  placeholder="Search Projects..."
                                  onChange={(e) => setInput(e.target.value)}
                              />
                          </div>

                          <div className="flex  mt-3 md:mt-0 items-center gap-2">
                            <label className="font-dm-regularblock text-sm  text-[#555C6D]">
                              Status:
                            </label>
                            <DropDown dropdownData={StatusObaject} name=""  onGetData={FilterStatus} />
                          </div>
                     </div>
                      {
                    location.pathname === '/projects' ? '' : 
                     <button onClick={() =>navigation('/projects')}>
                        <p className="text-[#7A4CF5] md:text-start mt-5 md:mt-0 text-end font-dm-medium text-[15px] underline cursor-pointer">View All</p>
                     </button>
                  }
                  </div>
                    : <>
                        {
                    location.pathname === '/projects' ? '' : 
                     <button onClick={() =>navigation('/projects')}>
                        <p className="text-[#7A4CF5] md:text-start mt-5  text-end font-dm-medium text-[15px] underline cursor-pointer">View All</p>
                     </button>
                  }
                    </>
                   }
  
              </div>
                 
                 <div className="overflow-x-auto scrollbar-smooth hide-scrollbar xl:overflow-x-hidden md:w-full min-w-0">
                    <div className="xl:w-full w-[1000px]">
                    <div className="grid pt-3  pb-3 pl-3 rounded-tl-[10px] rounded-tr-[10px] grid-cols-6 bg-[#6c4cf10d] mt-10 gap-10">
                        {
                          projectColumnName.map((eachCloum , index) => (
                             <div key={eachCloum} className={`${index === 0 ? 'col-span-2' : 'col-span-1'}`}>
                                 <h1 className="text-[18px] text-[#053D9E] font-dm-medium">{eachCloum}</h1>
                             </div>
                          ))
                        }
                    </div>
                    {
                      filterData().length === 0 ? <Nodata value={`${filterStatus} ${userInput ?'to' : ''} ${userInput}`}/> : 
                    <>
                    {
                      filterData().map((eachdata , index )=> (
                        <div key={index}>
                          <div className={` ${index === 0 ? 'border-1 border-gray-200' : ' '} 
                             `}/>
                          <div  className="grid grid-cols-6  gap-10 mt-3 mb-3">
                            <div className="flex items-start gap-3 col-span-2">
                               <ProjectTypeIcons value={eachdata.projectType}/>
                               <h1 className="font-dm-bold text-gray-600 self-center pl-3  text-[16px] text-[#000000]">{eachdata.projectName}</h1>
                              
                              </div>

                           
                           
                                <div className="flex flex-col self-center col-span-1">
                                  
                                
                                 <div className="flex  items-center gap-3">
                                     <Prograss prograss={Number(eachdata.progress)}/>
          
                                     <p className="text-[12px] text-gray-600 font-dm-regular">{eachdata.progress}%</p>
                                     </div>
                                      </div>    
                                    
                                    <div className="col-span-1">
                                      <Status status={eachdata.roleStatus}/>
                                    </div>
                                     
                                       <h1 className="text-[16px] col-span-1 self-center font-dm-regular  text-[#000000]">{configDate(eachdata.deadline)}</h1>

                                     <div className="bg-[#ffffff] h-[30px] w-[80px] col-span-1 self-center  flex items-center gap-2  hover:scale-95 transition duration-300 ease-int-out border-1 border-[#4f7cff]/50  items-center rounded-[5px] cursor-pointer p-3 shadow-md"
                                     onClick={() => navigation(`/projectDetails/${eachdata.projectId}`)}
                                     >
                                         <MdRemoveRedEye className="h-[50px] w-[50px] text-[#7A4CF5]"/>
                                         <h1 className="text-[#7A4CF5] text-[15px] font-dm-medium">View</h1>
                                     </div>
                          </div>
                             <div className={` ${index === projectData.length - 1 ? '' : ' border-b-1 border-gray-200'} 
                             `}/>
                            </div>
                      ))
                    }
                    </>
                     }
                  </div>
                  </div>
             </div> 
            }
          </>
    )
}



const Projects = () => {  
  const {
    projects,
    status

  } = useEmployeeData()
   
  const pageRender = () => {
    switch(status) {
       case renderState.loading : 
       return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
      
       case renderState.success : 
       return <ProjectsStatus projectData={projects}/>
 
      case renderState.failure :
     return  <PageNotFound />
      
      default :
      return null
    }
}

    return (
        <div className="h-[calc(100dvh-80px)] overflow-y-auto scroll-smooth hide-scrollbar p-5">
                 <div className="md:flex items-center justify-between">
                    <div>
                       <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">My Projects</h1>
                    </div>
    
                 </div>
              
              {pageRender()}
        </div>
    )
}

export default Projects