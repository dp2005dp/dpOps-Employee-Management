import { useState , useEffect } from "react";
import { employeesServices } from "../../services/employeeSerives";
import type {EmployeeInterface , EmployeeProjectsInterface , ReportsFormInterface  , EmployeeDataProps} from "../mockdata/mockdata";
import { useContext , createContext } from "react";
import type { ReactNode } from "react";
import socket from "../Socket/socket";

const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

const  EmployeeDataContext = createContext<EmployeeDataProps | null>(null)

const EmployeeDataLayout = ({children}: { children: ReactNode }) => {

  const [projects , setProjects] = useState<EmployeeProjectsInterface[]>([])
  const [status , setStatus] = useState(renderState.loading)
  const empId =  String(localStorage.getItem('EMPID'))
  const [data, setEmployeedetails] = useState<EmployeeInterface>()
  const [reports , setReorts] = useState<ReportsFormInterface[]>([])   

  const EmployeeProjectsAndDetails = async () => {
     
     try {
          setStatus(renderState.loading)
          const [projectsResponse  , employeedetails , employeeReports]=await  Promise.all([employeesServices.getAllProjects(empId) , employeesServices.getEmployeeDetails(empId) , employeesServices.getReports(empId)])

          if(projectsResponse.status === 200 && employeedetails.status === 200 && employeeReports.status === 200) {
            setProjects(projectsResponse.data.data)
            setEmployeedetails(employeedetails.data.data[0])
            setReorts(employeeReports.data.data)
            setStatus(renderState.success)

            console.log(employeeReports.data)
          }
       
     }
     catch(e){
      setStatus(renderState.failure)
     }
    
   }
 

   useEffect(() => {
    EmployeeProjectsAndDetails()

    socket.on('get assignEmployess' , () => {
        EmployeeProjectsAndDetails()
    })

     socket.on('get Employee' , () => {
        EmployeeProjectsAndDetails()
    }) 

     socket.on('get Project' , () => {
        EmployeeProjectsAndDetails()
    })

    socket.on('Update Project Status' , () => {
        EmployeeProjectsAndDetails()
    })

    socket.on('get Reports' , () => {
        EmployeeProjectsAndDetails()
    })

    return () => {
        socket.off('get assignEmployess')
        socket.off('get Employe')
        socket.off('get Project')
        socket.off('Update Project Status')
        socket.off('get Reports')
    }

   },[empId])
   




    return (
         <EmployeeDataContext.Provider
         value={{
            projects,
            data,
            status ,
            reports
         }}
         >
          {children}
         </EmployeeDataContext.Provider>
    )
}

export const  useEmployeeData = () => {
   const context =  useContext(EmployeeDataContext)
     
   if (!context) {
        throw new Error(
            "useEmployeeData must be used within EmployeeDataLayout"
        );
    }

    return context
} 

export default EmployeeDataLayout;