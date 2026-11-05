import DropDown from "../components/DropDown"
import { useState  , useEffect} from "react"
import  {employeesServices} from "../../services/employeeSerives"
import type { EmployeeProjectsInterface} from "../mockdata/mockdata"
import Prograss from "../components/Prograss"
import toast from "react-hot-toast"
import PageLoader from "../components/PageLoader"
import PageNotFound from "../components/PageNotFound"
import AddProjectsData from "../assets/AddProjectsData.png"
import EmptyState from "../components/EmptyState"
import { useEmployeeData } from "../components/EmployeeDataLayout";
const StatusObaject = [
    "In Progress",  "Completed" , "Planning" , "Pending" , "Delayed" , "Not Started"
]


const statusGuide = [
  {
    status: "Not Started",
    description: "Project not yet begun.",
    color: "#666d8f",
  },
  {
    status: "In Progress",
    description: "Work is ongoing.",
    color: "#1685F7",
  },
  {
    status: "On Hold",
    description: "Temporarily paused.",
    color: "#F59E0B",
  },
  {
    status: "Completed",
    description: "Project finished.",
    color: "#27B58C",
  },
  {
    status: "Delayed",
    description: "Behind schedule.",
    color: "#E63946",
  },
];

const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

const UpdateProjectStatus = () => {
    
    const {projects , status} = useEmployeeData()
   



const pageRender = () => {
    switch(status) {
       case renderState.loading : 
       return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
      
       case renderState.success : 
       return <UpdateProjectForm project={projects}/>
 
      case renderState.failure :
     return  <PageNotFound />
      
      default :
      return null
    }
}
    return (
         <div className="h-[calc(100dvh-80px)] overflow-y-auto scrollbar-smooth hide-scrollbar p-5">
            <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">Update project Status</h1>
            <p className="md:text-[18px] text-[clamp(14px,3.5vw,16px)] tracking-[-0.5px] md:tracking-[0px] font-dm-regular text-gray-600 ">Select a project and update its current status.</p>
           
           {
                projects.length === 0 ?  <EmptyState  title="No Projects Yet" value="Please wait for your administrator to assign one." 
                image={AddProjectsData}
                /> : 
       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-2">
             <div className="md:col-span-3 mt-5 shadow-md rounded-[8px] bg-[#ffffff] p-3">
             {pageRender()}
             </div>

               <div className="md:col-span-1 w-[100%] mt-5 shadow-md rounded-[8px] bg-[#ffffff] p-5">
                     <h1 className="md:text-[22px] text-[clamp(18px,4vw,20px)] font-dm-bold text-[#112F62]">Status Guide</h1>
                     
                       {
                        statusGuide.map(eachdata => (
                           <div className="flex items-center mt-5 mb-5  gap-2">
                                 <div 
                                     className="rounded-full  h-[30px] flex flex-col items-center justify-center w-[30px]"
                                     style={{
                                         backgroundColor : `${eachdata.color}20`
                                     }}>

                                         <div 
                                     className="rounded-full h-[20px] flex flex-colitems-center items-center  justify-center w-[20px]"
                                     style={{
                                         backgroundColor : eachdata.color
                                     }}>
                                          
                                        <div className="rounded-full bg-[#ffffff]  h-[5px] w-[5px]"/>
                                          
                                     </div>
                                         
                                  </div>
                                <div>
                                   <h1 className="text-[15px] font-dm-medium"
                                       style={{
                                             color : eachdata.color
                                       }}>
                                        {eachdata.status}</h1>
                                   <p className="font-dm-regular text-sm text-[#555C6D]">{eachdata.description}</p>
                                </div>
                          </div>
                        ))
                       }
                      
               </div>
        </div>
       }
         </div>
    
    )
}

interface FormProps {
    project : EmployeeProjectsInterface[]
}

const UpdateProjectForm = ({project} : FormProps) => {
    const [projectName , setProjectName] = useState(project.map(p => p.projectName)[0])
    const [progress , setProgress] = useState<number>(0)
    
    const [status , setStatus] = useState(StatusObaject[0])
    const getStatus= (value : string) => {
        setStatus(value)
    }

     const ProjectName= (value : string) => {
        setProjectName(value)
    }

    useEffect(() => {
        setProgress(status === 'Completed' ? 100 : progress)
    },[status])
       
     const updateProjectStatus = async (e:React.FormEvent) => {
         e.preventDefault()
        
         try {
            const error = Vaidation()

            if (error) {
                toast.error(error)
                return
            }
            
            const getData = project.find(data => data.projectName === projectName)
            
            const data = {
                assignedRole : getData?.assignedRole,
                progress : progress,
                roleStatus : status,
            }

            const response = await employeesServices.updateProjectStatus(getData?.projectId , data)

            if (response.status === 200) {
                toast.success(response.data.message)
                
                setProgress(0)
                setStatus(StatusObaject[0])

              }
         }
         catch(e){
            console.log(e)
         }
         
     }

     const Vaidation = () => {
         if (!projectName) {
            return 'Select Project'
         }

          if (!status) {
            return 'Select Project Current Status'
         }

          if (!progress) {
            return 'Enter Progress'
         }

         return null
     }

    return (
    
              <form onSubmit={updateProjectStatus}>
                <div className="mt-3 mb-2">
                <label className="mb-2 font-dm-regular block text-md  text-[#555C6D]">
                            Project
                    </label>
                        <DropDown dropdownData={project.map(p => p.projectName)} name="" onGetData={ProjectName} />
                 </div>

                <div className="mt-3 mb-2">
                <label className="mb-2 font-dm-regular block text-md  text-[#555C6D]">
                            Status
                    </label>
                        <DropDown dropdownData={StatusObaject} name="" onGetData={getStatus} />
                 </div>  
               
                <div className="mt-3 mb-2">
                    <p className="mb-2 font-dm-regular block text-md  text-[#555C6D]">Progress</p>
                     
                    <div className="md:flex items-center gap-3 mb-5"> 
                    <input type='tel' 
                        disabled= {status === 'Completed'}
                        className="h-[40px] w-[150px] focus:border-[#7A4CF5]  focus:ring-2 focus:ring-[#7A4CF5]/20  border-1 border-gray-200 rounded-[10px] p-[15px]
                        text-[#000000] text-[15px]  outline-none transition
                        "
                        placeholder='Enter Progress...'
                        onChange={(e) => {
                         const value = e.target.value.replace(/\D/g, "");
                         setProgress(status === 'Completed' ? 100 : Number(value))
                         }}
                        maxLength={2}
                        inputMode="numeric"
                        value={progress}
                        />
                    <p className="text-[15px] text-red-500 font-dm-regular mt-2 md:mt-0">* between 0 - 100</p>
                    
                     </div>

                    <Prograss prograss={status === 'Completed' ? 100 :  progress}/>
                    <p className="font-[#000000] text-[15px] font-dm-regular">{`${status === 'Completed' ? '100' : progress}%`}</p>
                 </div>

                 <div className="mt-3 mb-2">
                           <p className="mb-2 font-dm-regular block text-md  text-[#555C6D]">Remarks</p>
                           <textarea placeholder="Write Remerks..." className="h-[100px] outline-none focus:border-1 focus:border-[#7A4CF5] focus:ring-2 focus:ring-[#7A4CF5]/20 w-[100%] rounded-[8px] p-3 border-gray-200 border-1"></textarea>
                       </div>

                <button type="submit" className="rounded-[8px] h-[40px] font-dm-regular text-[15px] hover:scale-95 w-[100%] mt-3 cursor-pointer text-[#ffffff] text-[15px] bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff]">
                    Update Status
                </button>
               </form> 
        
)
}

export default UpdateProjectStatus;