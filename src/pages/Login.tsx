import { BiLogoOpera } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import LoginImage from "../assets/LoginImage.png"
import toast from "react-hot-toast";
import { employeesServices } from "../../services/employeeSerives";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const Login =() => {
    const navigation = useNavigate()
    const [isShowPassword , setShowPassword] = useState<boolean>(false)
    const[username ,setUsername] = useState<string>('')
    const[password ,setPassword] = useState<string>('')
    
    
    const Valition = () => {
        if (!username) {
            return 'Required username'
        }
        if (!password) {
            return 'Required password'
        }
        return null
    }
    
    const onSubmitLogin = async (e:React.FormEvent) => {
         e.preventDefault()
        
        try{
           const error = Valition()

        if (error) {
           toast.error(error)  
           return
        }

        const response = await employeesServices.login(username , password)

        if (response.status === 200) {
            localStorage.setItem('token' , response.data.token)
            localStorage.setItem('EMPID' , response.data.data)
            toast.success(response.data.message)

            navigation('/')
        }

        else {}
        }
        
        catch(e){
            if (isAxiosError(e)) {
                toast.error(e.response?.data.message)
            }
        }
        
    }

    return  (
    <div className="md:flex flex-col md:p-5 justify-center items-center  md:h-screen">  
        <div className="md:flex items-start">
            <div className="p-5 md:rounded-tl-[20px]  md:rounded-bl-[20px] shadow-lg   md:h-[90vh]   md:w-[380px] bg-[#051933]">
                <div className="flex items-start  gap-3">
                    <div className="flex flex-col items-center justify-center h-[40px] w-[50px] rounded-[5px] bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff]">
                        <BiLogoOpera className="h-[20px] w-[20px] text-white"/>
                        </div>
                        <div>
                        <h1 className="md:text-[35px] text-[clamp(24px,8vw,28px)] text-[#ffffff]  font-heading">DpOps</h1>
                        <p className="md:text-[15px] text-[clamp(14px,3.5vw,15px)] mt-2 leading-[100%] text-[#ffffff] font-dm-regular">Project Management SaaS platform</p>
                    </div>
                </div> 
           
                <h1 className="text-[#ffffff] text-[clamp(16px,5vw,20px)] leading-[100%] mb-5 mt-10 font-dm-medium text-[45px]">Build Together Achieve More</h1>
                <p className="text-[#ffffff] text-[clamp(14px,3.5vw,16px)] font-dm-regular text-[20px]">Stay connected,track your projects,
                submit reports and grow with us.
                </p>

                <img src={LoginImage} className="xl:h-[200px] 2xl:h-[350px] md:mt-10 xl:mt-5 h-[150px] hidden md:block w-[350px] object-cover" alt="login image"/>
           
            </div>

            <div className="p-5 md:rounded-tr-[20px] md:rounded-br-[20px] shadow-lg md:h-[90vh] md:pt-25 lg:pt-30 2xl:pt-40 bg-[#ffffff] items-center">
                <h1 className="text-[#112F62] font-dm-medium text-[28px]">Employee Login</h1>
                <p className="text-gray-500 font-dm-regular text-[18px] mt-2 mb-5">Welcome back Place login to your account.</p>
            <form onSubmit={onSubmitLogin}>
                <div className="mb-3">
                    <label className="text-gray-600 font-dm-regular mb-5 text-[18px]">
                        Username
                    </label>
                    <br/>
                    <input 
                    className="h-[40px] font-dm-regular outline-none mt-2 w-[100%] rounded-[8px] border-1 p-[15px] text-[15px] text-[#000000] border-gray-200"
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="text-gray-600 font-dm-regular mb-5 text-[18px]">
                        Password
                    </label>
                <div className="flex mt-2 items-center justify-between h-[40px] w-[100%] rounded-[8px] border-1 p-[15px] text-[15px] text-[#000000] border-gray-200">
                    <input 
                    type= { isShowPassword ? "text" : 'password'}
                    placeholder="Enter Password"
                    value={password}
                    className="outline-none font-dm-regular"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="cursor-pointer"  onClick={() => setShowPassword(!isShowPassword)}>
                        {
                            isShowPassword ?  <MdRemoveRedEye />  
                            : <IoEyeOffOutline />
                        }
                    </button>  
                </div>  
                </div>

                <button type="submit" className="rounded-[8px] h-[40px] w-[100%] mt-3 cursor-pointer text-[#ffffff] text-[15px] bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff]">
                    Login
                </button>
            </form>
            </div>
        </div>
     </div>  
)
}

export default Login