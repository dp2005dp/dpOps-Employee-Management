import {ProjectsStatus} from "./Projects";
import { RiContractFill } from "react-icons/ri";
import { CgPoll } from "react-icons/cg";
import { TbReportAnalyticsFilled } from "react-icons/tb";
import { MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import type { EmployeeProjectsInterface , ReportsFormInterface} from "../mockdata/mockdata";
import PageLoader from "../components/PageLoader";
import PageNotFound from "../components/PageNotFound";
import { useEmployeeData } from "../components/EmployeeDataLayout";
const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

const Dasboard =() => {
    const {projects , status , reports ,  data} = useEmployeeData()
     
  
  
  const pageRender = () => {
      switch(status) {
         case renderState.loading : 
         return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
        
         case renderState.success : 
         return <DasboardDetails project={projects} reports={reports}/>
   
        case renderState.failure :
       return  <PageNotFound />
        
        default :
        return null
      }
  }
    
  return (     
    <div className="p-5 overflow-y-auto scroll-smooth hide-scrollbar  h-[calc(100dvh-80px)]">
     {/* Welcom */}
     <h1 className="md:text-[26px] text-[clamp(20px,5vw,26px)] text-[#000000]  font-bold">Hi, {data?.fullName} 👋</h1>
     <p className="md:text-[18px] text-[clamp(15px,4vw,18px)] text-gray-500">Here's your project overview.</p>
    
      {pageRender()}
   
  
</div>
)
}


interface DetailsProps {
  project : EmployeeProjectsInterface[]
  reports : ReportsFormInterface[]
}

const DasboardDetails = ({project , reports} : DetailsProps) => {
  const navigation = useNavigate()
  return (
  <>
     <CardsContainer tProjects={project.length} pendindProjects={project.filter(pp => pp.roleStatus === 'Pending').length} activeProjects={project.filter(pp => pp.roleStatus === 'In Progress').length} reports={reports.length}/>
    
  
     <h1 className="md:text-[26px] hidden md:block text-[clamp(20px,5vw,26px)] mt-10 mb-0 text-[#112F62]  font-bold">Project Status</h1>
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
      <div className="order-2 md:order-1 xl:col-span-3">
            <div>
                <h1 className="md:text-[26px] md:hidden block text-[clamp(20px,5vw,26px)] mt-10 mb-0 text-[#112F62]  font-bold">Project Status</h1>
            </div>
            <ProjectsStatus projectData={project}/>
      </div>
      <div className="order-2  shadow-md flex flex-col justify-center items-center  xl:col-span-1 bg-[#ffffff] mt-3   p-3 rounded-[8px]">
          <h1 className="md:text-[22px]  text-[clamp(20px,5vw,26px)] mt-10 mb-0 text-[#112F62]  font-bold">Quick Actions</h1>
          <button 
          onClick={() =>navigation('/reports')}
          className="h-[50px] transition duration-300 ese-in-out hover:scale-95 p-3 bg-[#8D49D1] font-dm-medium mt-5 mb-3 w-[100%] flex justify-center items-center gap-3 text-[#ffffff] rounded-[8px] cursor-pointer text-[15px]">
              <TbReportAnalyticsFilled className="text-[#ffffff] h-[20px] w-[20px]"/>  Submit Reports
          </button>

          <button 
          onClick={() =>navigation('/UpdateStatus')}
          className="h-[50px] transition duration-300 ese-in-out hover:scale-95 bg-[#A849D1] font-dm-medium mt-3 p-3  w-[100%] flex justify-center items-center text-[#ffffff] gap-3 rounded-[8px] cursor-pointer text-[15px]">
              <MdOutlineUpdate className="text-[#ffffff] h-[20px] w-[20px]"/>  Update Status
          </button>

          <button 
          onClick={() =>navigation('/projects')}
          className="h-[50px] transition duration-300 ese-in-out hover:scale-95 bg-[#ffffff] border-1 border-[#7A4CF5] text-[#7A4CF5] font-dm-medium mt-3  w-[100%] rounded-[8px] cursor-pointer text-[15px]">
              View All Projects
          </button>
      </div>
    </div>
   </>
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
        <div className="mt-5 mb-2 grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4  gap-5">
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

export default Dasboard