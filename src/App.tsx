import Navbar from "./components/Navbar"
import Dasboard from "./pages/Dasboard"
import UpdateProjectStatus from "./pages/UpdateProjectStatus"
import Projects from "./pages/Projects"
import Login from "./pages/Login"
import ProjectDetails from "./pages/ProjectDetails"
import Reports from "./pages/reports"
import Profile from "./pages/Profile"
import { RiMenuFold2Fill } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import {Routes ,Route} from "react-router-dom"
import { useState , useEffect} from "react"
import {motion} from "motion/react"
import { useLocation , useNavigate } from "react-router-dom"
import ProductRoutes from "./components/ProductRoutes"
import PublicRoutes from "./components/PublicRoutes"
import EmployeeDataLayout from './components/EmployeeDataLayout.tsx'
import { Outlet } from "react-router-dom"
import { employeesServices } from "../services/employeeSerives.ts"
import type { EmployeeInterface } from "./mockdata/mockdata.ts"
const App = () => {
    const location = useLocation()
    const [isShowNavBar , setShow] = useState(false)
    const navigation = useNavigate()
    const [empId , setId] = useState('')
    const [data , setData] = useState<EmployeeInterface>()
    
    const fetchEm = async () => {
          const response = await employeesServices.getEmployeeDetails(empId)

          if (response.status === 200) {
              setData(response.data.data[0])
          }
    }
    

    useEffect(() => {
        const empId = String(localStorage.getItem('EMPID'))
        setId(empId)
    } , [empId])
    
    
    useEffect(() => {

      if (!empId) return 
       fetchEm()
    },[empId])

  

    return (

   <div className="flex items-start bg-[#F6F8FD]  w-full">
     <div className={` ${location.pathname === '/login' ? 'hidden' : 'hidden lg:block'}`}>
      <Navbar/>
       </div>
      
       <div className="relative w-full">
           {/* Admin */}
      <div className={`flex lg:justify-end justify-between h-[80px] w-[100%] p-5 items-center gap-5 bg-[#ffffff]
        ${location.pathname === '/login' ? 'hidden' : 'block'}
        `}>
          <button className="lg:hidden md:block cursor-pointer"
          onClick={() => setShow(!isShowNavBar)}
          >
              <RiMenuFold2Fill className=" h-[30px] w-[30px] text-[#7A4CF5]"/>
          </button>
           
           <button 
            onClick={() => navigation('/profile')}
           className="flex items-center cursor-pointer">
           
                <img src={`${import.meta.env.VITE_IMAGE_URL}${data?.profilePhoto}`} className="h-[50px] w-[50px] rounded-full object-cover object-top"  alt="profile"/>
                <RiArrowDropDownLine  className="h-[30px] w-[30px] text-[#112F62]"/>             
            </button>
      </div>
       <Routes>
            <Route element={<PublicRoutes />}>
               <Route path="/login" element={<Login />}/>
            </Route>
            

            <Route element={<ProductRoutes />}>
                <Route element={<EmployeeDataLayout>
                        <Outlet />
                </EmployeeDataLayout>}>
                <Route path="/" element={<Dasboard />}/>
                <Route path="/UpdateStatus" element={<UpdateProjectStatus />}/>
                <Route path="/projects" element={<Projects />}/>
                <Route path="/projectDetails/:id" element={<ProjectDetails />}/>
                <Route path="/reports" element={<Reports />}/>
                <Route path="/profile" element={<Profile />}/>
              </Route>
            </Route>
       </Routes>

       {
                isShowNavBar && (
                    <motion.div 
                      
                    initial = {{
                        x:-50,       
                    }}

                    animate = {{
                        x:0,
                         opacity : 1,
                         transition : {
                              
                              ease : 'easeIn'
                         }
                    }}

                    className="absolute lg:hidden block top-0 z-50 inset-0 bg-black/50 left-0"
                    onClick={() => setShow(false)}
                    >
                        <Navbar />
                    </motion.div>
                   
                )
            }
      </div>
   </div>


)
}

export default App