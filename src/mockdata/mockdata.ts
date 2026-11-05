export interface EmployeeProjectsInterface {
  assignedRole : string;
  deadline : string;
  projectName : string;
  roleStatus : string;
  startDate : string;
  projectType : string
  ClientCompany : string
  progress : string
  projectDescription : string
  projectId : string
}

export interface EmployeeInterface{
  employeeId : number;
  username : number | string;
  password : string | number;
  fullName: string;
  email: string;
  phone: string | number;
  role: string;
  department: string;
  profilePhoto: string | null;
  joinDate: string;
  experienceYears: number;
  employmentType: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  aboutEmployee: string;
}

export interface ReportsFormInterface {
  projectName : string
  reportTitle : string
  description : string
  file : File | null
  employeeId : string
  projectId : string
  createdAt : string
  status : string
}

export interface EmployeeDataProps {
   projects : EmployeeProjectsInterface[]
   data : EmployeeInterface | undefined
   status : string
   reports : ReportsFormInterface[]
}

export interface ProjectInterface {
  projectId : number;
  clientName : string
  ClientCompany: string;
  ClientEmail: string;
  clientPhone: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  priority: string;
  startDate: string;
  deadline: string;
  budget: number;
  projectStatus: string;
  progress : number;
  file: File | null;
  roles : string
  createdAt : string
}

export interface assignProjectmembers {
assignedRole : string;
fullName : string; 
profilePhoto : string;
projectId : number;
role : string;
progress : number;
roleName : string;
roleStatus : string;
}