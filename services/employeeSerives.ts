import Axios from "./config/Axios";

interface StatusData {
     assignedRole : string | undefined,
     progress : number
     roleStatus : string
}

export const employeesServices = {
     getAllProjects :  (id:string) => Axios.get(`/getEmployeeProjects/${id}`),
     getEmployeeDetails : (id:string) => Axios.get(`/getemployeeById/${id}`),
     updateProjectStatus : (projectId:string | undefined, data:StatusData) => Axios.put(`/updateProjectStatus/${projectId}` , data),
     reports  : (data:FormData) => Axios.post('/reports' , data),
     getReports : (employeeId : string) => Axios.get(`/getReports/${employeeId}`),
     login : (username : string , password : string) => Axios.post('/employeeLogin' , {username , password}),
     ProjectDetails : (projectId:number) => Axios.get(`/getByIdByEmployee/${projectId}`),
     getEmployess : (projectId : number) => Axios.get(`/getAssignEmployessWithProjectIdByEmployee/${projectId}`),
}