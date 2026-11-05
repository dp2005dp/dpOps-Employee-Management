interface ProjectTypeInterface {
    value : string
}
 
import { MdWeb } from "react-icons/md";
import { FaMobileRetro } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { PiShoppingBagFill } from "react-icons/pi";
import { RiFolderSettingsFill } from "react-icons/ri";
import { GiRapidshareArrow } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
const ProjectTypeIcons = ({value} : ProjectTypeInterface) => {

 const getIcons = () => {
    switch (value) {
    
    case 'Web Development' :
       return  {
          icon : < MdWeb className="h-[28px] w-[28px] text-[#ffffff]"/>,
          bgColor : ['#9E4DE0' ,'#701FB2']
       }


     case 'Mobile App Development' :
     return {
          icon :  <FaMobileRetro className="h-[28px] w-[28px] text-[#ffffff]"/>,
          bgColor : ['#4D83E0' ,'#296AD9']
       }

     case 'UI/UX Design' :
     return {
          icon :  <FaPen className="h-[20px] w-[20px] text-[#ffffff]"/> ,
          bgColor : ['#E574E7' ,'#DD4DE0']
       }
    
    case 'E-Commerce Development' :
     return {
          icon :  <PiShoppingBagFill className="h-[28px] w-[28px] text-[#ffffff]"/>,
          bgColor : ['#F88862' ,'#F76636']
       }

    case 'Software Development' :
    return {
        icon :  <RiFolderSettingsFill className="h-[28px] w-[28px] text-[#ffffff]"/>,
        bgColor : ['#62CBF8' ,'#36BDF7']
    }

    case 'API Development' :
    return {
        icon :  <GiRapidshareArrow className="h-[28px] w-[28px] text-[#ffffff]"/>,
        bgColor : ['#F8BF62' ,'#F59C0C']
    }

    case 'Dashboard Development' :
    return {
        icon : < MdDashboard className="h-[28px] w-[28px] text-[#ffffff]"/> ,
        bgColor : ['#CE62F8' ,'#B30CF5']
    }

    case 'B2B Platform' :
    return {
        icon : <BsGraphUpArrow className="h-[28px] w-[28px] text-[#ffffff]"/>,
        bgColor : ['#F86262' ,'#F73636']
    }
    
    default:
        return null
    }
    }
     
    const projectIcon = getIcons();

    return(     
        <div className={`h-[30px] w-[30px] rounded-[5px] flex flex-col justify-center items-center`}
          style={{
                backgroundImage: `linear-gradient(
                    to bottom right,
                    ${projectIcon?.bgColor[0]},
                    ${projectIcon?.bgColor[1]}
                )`
            }}
        >

            {getIcons()?.icon}
             
        </div>

    )
}

export default ProjectTypeIcons;