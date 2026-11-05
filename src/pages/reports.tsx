import DropDown from "../components/DropDown"
import React, { useState ,useRef} from "react"
import Input from "../components/Input"
import toast from "react-hot-toast"
import PageLoader from "../components/PageLoader"
import PageNotFound from "../components/PageNotFound"
import  {employeesServices} from "../../services/employeeSerives"
import type { EmployeeProjectsInterface  , ReportsFormInterface} from "../mockdata/mockdata"
import { IoMdCloudUpload } from "react-icons/io";
import { TbXboxXFilled } from "react-icons/tb";
import Status from "../components/Status"
import AddProjectsData from "../assets/AddProjectsData.png"
import EmptyState from "../components/EmptyState"
import noReports from "../assets/noReports.png"
import { useEmployeeData } from "../components/EmployeeDataLayout";
const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}



const Reports = () => {   
  const {projects , reports , status} = useEmployeeData()
  
  


const pageRender = () => {
    switch(status) {
        case renderState.loading : 
        return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
      
        case renderState.success : 
        return <ReportForm projects={projects} reports = {reports}/>
  
        case renderState.failure :
        return  <PageNotFound />
      
      default :
      return null
    }
}

    return (
         <div className="h-[calc(100dvh-80px)] overflow-y-auto scrollbar-smooth hide-scrollbar p-5">
            <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">Submit project Report</h1>
            <p className="md:text-[18px] text-[clamp(14px,3.5vw,16px)] md:tracking-[0px] tracking-[0.5px ]font-dm-regular text-gray-600 ">Select a project and update its current status.</p>
               
             {pageRender()}
             
         </div>
    )
}

interface ReportFormProps {
 projects : EmployeeProjectsInterface[]
 reports : ReportsFormInterface[]
}



const ReportForm = ({projects , reports} : ReportFormProps) => {

  const [reportTitle , setTitle] = useState('')
  const [projectName , setProjectName] = useState(projects.map(p => p.projectName)[0])
  const [reportNote , setNote] = useState('')
  const [prevfile , setPrevFile] = useState('')
  const [file , setFile] = useState<File | null>(null)
  const empId = localStorage.getItem('EMPID')
  const ReportTitle= (value:string) => {
        setTitle(value)
    }

  const OnProjectName= (value : string) => {
        setProjectName(value)
    }

   const fileInputRef = useRef<HTMLInputElement>(null);

      const handleFile = (file: File) => {
       if (!file.type.startsWith("image/")) {
         alert("Only image files are allowed");
         return;
      }
      
      setPrevFile(URL.createObjectURL(file))
      
      setFile(file)


      };

      const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
         handleFile(file);
      }
      };

      const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const file = e.dataTransfer.files?.[0];

      if (file) {
         handleFile(file);
      }
      };
  
     
    const Validition = () => {
       if (!projectName) {
         return 'Select Project Name'
       }

       if (!reportTitle) {
         return 'Fill Report Title'
       }

        if (!file) {
         return 'Select File'
       }

        if (!reportNote) {
         return 'Fill Reports'
       }
    }

    const OnSumbitData = async (e:React.FormEvent) => {
      e.preventDefault()

      const error = Validition()

      if (error) {
        toast.error(error)

        return 
      }
      
      const getData = projects.find(p => p.projectName === projectName)

      const formData = new FormData()

      formData.append('reportTitle' , reportTitle)
      formData.append('projectName' ,projectName)
      formData.append('reportNote' ,reportNote)
      formData.append('image', file as string |  Blob)
      formData.append('projectId' , getData?.projectId as string)
      formData.append('employeeId' , String(empId))
     console.log(projectName , file , reportNote , reportTitle)
      
      const response = await employeesServices.reports(formData)

      console.log(response)

      if (response.status === 200) {
          toast.success(response.data.message)
        
          setFile(null)
          setNote('')
          setProjectName('')
          setTitle('')
          setPrevFile('')
      }
    }
    
    const conFigDate = (date:string) => {
       const newDate = new Date(date)
       return  `${newDate.getDay()}-${newDate.getMonth()}-${newDate.getFullYear()}`
    }
  return (
          <>
            {
      projects.length === 0 ?  <EmptyState  title="No Projects Yet" value="Please wait for your administrator to assign one." 
       image={AddProjectsData}
      /> : 
         
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 mt-5 shadow-md rounded-[8px] bg-[#ffffff] p-3">
              <form onSubmit={OnSumbitData}>
                <div className="mt-3 mb-2">
                <label className="mb-2 font-dm-regular block text-md  text-[#555C6D]">
                      Project
                    </label>
                    <DropDown dropdownData={projects.map(p => p.projectName)} name=""  onGetData={OnProjectName} />
                 </div>

                <div className="mt-3 mb-2">
                <label className="mb-2 font-dm-regular block text-md  text-[#555C6D]">
                            Report Title
                    </label>
                        <Input  onGetData={ReportTitle} name="" value={reportTitle} type="text"/>
                 </div>  
               

                 <div className="mt-3 mb-2">
                           <p className="mb-2 font-dm-regular block text-md  text-[#555C6D]">Reports</p>
                           <textarea
                            onChange={(e) => setNote(e.target.value)}
                            value={reportNote}
                            placeholder="Write Reports..." className="h-[100px] outline-none focus:border-1 focus:border-[#7A4CF5] focus:ring-2 focus:ring-[#7A4CF5]/20 w-[100%] rounded-[8px] p-3 border-gray-200 border-1"></textarea>
                 </div>

                 <div className="mt-3 mb-2">
                           <p className="mb-2 font-dm-regular block text-md  text-[#555C6D]">Attach File</p>
                            
                     {
                        
                        prevfile ? <div className="flex justify-center relative">
                               <img src={prevfile}  className="h-[350px] self-center w-[100%]  object-cover" />

                               <button
                               type="button"
                               onClick={() => setPrevFile('')}
                               className="cursor-pointer hover:scale-105  absolute top-0 right-0">
                                      <TbXboxXFilled className="h-[35px] w-[35px] hover:text-red-500 text-[#7A4CF5]"/>
                               </button>
                        </div>
                           
                           :

                        (
                           <div 
                           onClick={() => fileInputRef.current?.click()}
                           onDragOver={(e) => e.preventDefault()}
                           onDrop={onDrop}
                           className="h-[250px cursor-pointer rounded-[8px] border-style-dashed bg-[#7A4CF5]/10 border-1 p-3 border-[#7A4CF5] flex flex-col justify-center items-center">
                        <IoMdCloudUpload className="h-[20px] mb-2 w-[20px] text-[#7A4CF5]"/>
                        <h1 className="text-[14px] text-[#7A4CF5]">Click to upload</h1>
                        <p className="text-[12px] text-[#7A4CF5]">or drag and drop</p>
                        <p className="text-[12px] text-[#7A4CF5]">{'(PNG,JPG,up to 5MB)'}</p>
                      
                           <input
                              ref={fileInputRef}
                              type="file"
                              hidden
                              onChange={onFileChange}
                              accept="image/*"
                           />

                     </div>
                        )

                     }
                       </div>
                

                <button type="submit" className="rounded-[8px] h-[40px] font-dm-regular text-[15px] hover:scale-95 w-[100%] mt-3 cursor-pointer text-[#ffffff] text-[15px] bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff]">
                    Submit Report
                </button>
            </form>
            </div>

               <div className="xl:col-span-1 w-[100%] mt-5 overflow-y-auto  scrollbar-smooth shadow-md rounded-[8px] bg-[#ffffff] p-5">
                     <h1 className="md:text-[22px] text-[clamp(18px,4vw,20px)] font-dm-bold text-[#112F62]">Recent Reports</h1>
             { 
              reports.length === 0 ?  <EmptyState  title="No Reports Available" value="No reports have been submitted yet." 
                      image={noReports}
                      /> : 
                      <>
                       {
                        reports.map(eachdata => (
                           <div className="md:flex shadow-md rounded-[5px] p-3 bg-[#ffffff] justify-between items-start mt-5 mb-5  gap-5">
                                <div>
                                   <h1 className="text-[15px] text-[#000000] mb-3 font-dm-medium">
                                        {eachdata.projectName}</h1>
                                   <p className="font-dm-regular text-sm mb-1 text-[#555C6D]/100">{eachdata.reportTitle}</p>
                                   <p className="font-dm-regular text-sm mb-1 text-[#555C6D]">{conFigDate(eachdata.createdAt)}</p>
                                </div>

                                <Status status={`${eachdata.status[0].toLocaleUpperCase()}${eachdata.status.slice(1,eachdata.status.length)}`}/>
                          </div>
                        ))
                       }
                       </>
                          }
                      
               </div>
        </div>
          }
       </>
  )
}

export default  Reports;