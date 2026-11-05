import { MdCancel } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import type { ElementType } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";

interface ProjectDetails {
  projectName: string;
  role: string;
  status: "Completed" | "In Progress" | "Planning" | "On Hold" | "Not Started";
  duration: string;
}

interface EmployeeData {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  joiningDate: string;
  experience: string;
  status: "Active" | "On Leave" | "Inactive";
  skills: string[];
  projects: ProjectDetails[];
  responsibilities: string[];
}

interface EmployeeProps {
     data : EmployeeData,
     onClose : () => void
}

const EmployeeDeatils = ({data , onClose }: EmployeeProps) => {
    return (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50">
      
         <div className="bg-[#ffffff] overflow-y-auto scrollbar-smooth hide-scrollbar m-3 md:m-0 pb-20 h-[calc(100dvh-80px)] md:w-1/2 rounded-[8px] p-3">
           <div className="flex md:items-center items-start justify-between">
            <div className="lg:flex items-center gap-5">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSchZXheF0PLcI9KouezkctJPg4OiqIDJWvvSarF9roiQ&s=10" 
                  className="h-[80px]  w-[80] rounded-full"
                />
                <div>
                    <div className="md:flex items-center gap-5">
                   <h1 className="text-[#000000] mt-2 md:mt-0 font-dm-bold text-[20px]">{data.name}</h1>
                   <div className={`flex mt-2 items-center h-[25px] w-[100px] gap-2 rounded-[20px] p-2 ${data.status === 'Active' ? 'bg-[#16a05a]/20' : 'bg-[#f5b73b]/30'}`}>
                             <div className={`h-[10px] w-[10px] rounded-full ${data.status === 'Active' ? 'bg-[#16a05a]' : 'bg-[#f5b73b]'}`}/>
                             <p className={`${data.status === 'Active' ? 'text-[#16a05a]' : 'text-[#f5b73b]'} font-dm-medium text-[12px] `}>{data.status}</p>
                    </div>
                </div>
                
                <div className="flex items-centet gap-3 mt-2">
                    <p className="text-gray-500 text-[14px] font-dm-regular">{data.employeeId}</p> 
                    <p className="text-gray-500 font-bold text-[14px]">.</p> 
                    <p className="text-gray-500 text-[14px] font-dm-regular">{data.role}</p> 
                </div>
            </div>
            </div>

            <button onClick={onClose} className="cursor-pointer hover:scale-105">
                 <MdCancel className="text-[#7A4CF5] h-[35px] w-[35px]"/>
            </button>
           </div>  
             
             <div className="xl:flex gap-5 mt-3 justify-center items-center">
                   <div className="flex items-center gap-3">
                        <MdOutlineMailOutline  className="h-[20px] w-[20px] text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[16px] font-dm-regular">{data.email}</p>
                   </div>

                   <div className="flex items-center gap-2">
                        <FiPhone  className="h-[20px] w-[20px] text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[16px] font-dm-regular">{data.phone}</p>
                   </div>

                   <div className="flex items-center gap-2">
                        <GrLocation  className="h-[20px] w-[20px] text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[16px] font-dm-regular">{data.phone}</p>
                   </div>
             </div>

           <div className="border-1 mt-4 mb-3  border-gray-200"/>
            
           <div>
               <p className="text-[#7A4CF5] text-[18px] mb-3 font-dm-bold">Overview</p>
           </div>
            
           <div className="grid grid-cols-1 xl:grid-cols-2 mb-3 gap-5">
                <div className="border-1 xl:h-[250px] w-[100%] border-gray-200 rounded-[8px] p-3">
                    <h1 className="text-[18px] mb-2 font-dm-medium font-[#000000]">About</h1>
                    <p className="text-gray-500 text-[14px] font-dm-regular">We are looking for a practical, solutions-oriented Software Engineer to build, test, and maintain scalable web applications. You will collaborate with product managers, designers, and fellow engineers to ship high-quality features.</p>
                </div>
                
                <div className="border-1 xl:h-[250px] w-[100%] border-gray-200 rounded-[8px] p-3">
                    <Reusebles 
                    icon={FaCalendarAlt}
                    title="Join Data"
                    value={data.joiningDate}
                    />

                     <Reusebles 
                    icon={BiSolidShoppingBagAlt}
                    title="Experience"
                    value={data.experience}
                    />

                     <Reusebles 
                    icon={FaCalendarAlt}
                    title="Department"
                    value={data.department}
                    />

                     <Reusebles 
                    icon={FaCalendarAlt}
                    title="Reporting To"
                    value='Durgaprasad M E (Tech Lead)'
                    />
                </div>

           </div>

           <div className="rounded-[8px] border-1 border-gray-200 p-3">
              <h1 className="text-[15px] mb-3 font-dm-bold font-[#000000]">Current Projects</h1>
               <div className="overflow-x-auto xl:overflow-x-hidden xl:w-full min-w-0 scrollbar-smooth hide-scrollbar">
                  <div className="xl:w-full w-[500px]">

           
              <div className="grid grid-cols-4 bg-[#6c4cf10d] gap-5 border-1 border-gray-200 rounded-tl-[8px] rounded-tr-[8px] p-3">
              {
                ['Project Name' , 'Role' , 'Status' , 'Duration'].map(eachdata => (
                    <p className="text-[17px] text-[#053D9E] font-dm-medium">{eachdata}</p>
                ))
              }
              </div>
              
             
                 {
                    data.projects.map((eachdata) => (
                        <>
                      
                    <div className="grid grid-cols-4 gap-5 p-2 border-b-1 border-l-1 border-r-1 border-gray-200">
                          <h1 className="font-dm-bold text-gray-600 text-[16px] text-[#000000]">{eachdata.projectName}</h1>
                          <p className="text-[16px] font-dm-regular text-[#000000]">{eachdata.role}</p>
                          
                           <div 
                           className="rounded-[20px] h-[25px] flex flex-col justify-center w-[100px] p-2"
                           style={{
                               backgroundColor : eachdata.status === 'In Progress' ? '#e3ecff' : eachdata.status === 'Planning' ? '#fff1d6' : eachdata.status === 'Completed' ? '#dcf7e6' : eachdata.status === 'Not Started' ? '#eceef6' : '#ffe0e0'
                           }}>
                               <h1 className="text-[13px] font-dm-medium"
                               style={{
                                   color : eachdata.status === 'In Progress' ? '#2b62d9' : eachdata.status === 'Planning' ? '#c47d0a' : eachdata.status === 'Completed' ? '#16a05a' : eachdata.status === 'Not Started' ? '#666d8f' : '#d93a3a'
                               }}
                               >{eachdata.status}</h1>
                           </div>
                           
                     <p className="text-[16px] font-dm-regular text-[#000000]">{eachdata.duration}</p>                     
                    </div>

                    
                      </>
                    ))
                 }
              
             </div>
               </div>
           </div>
         </div>
       </div>
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
       <div className="flex mt-3 items-center gap-3">
           <Icon className ="text-[20px] w-[20px] text-[#7A4CF5]"/>
            <div>
                <h1 className="text-gray-400 text-[14px] font-dm-regular">{title}</h1>
                <p  className="text-[#000000] text-[15px] font-dm-medium">{value}</p>
            </div>
       </div>
   )
}

export default EmployeeDeatils