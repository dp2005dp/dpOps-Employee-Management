import type { IconType } from "react-icons";

interface CardsProps {
    Icon :  IconType,
    title: string,
    value : number,
    color : string
}

const Cards = ({Icon ,title, value , color}:CardsProps) => {

   return (
      
        <div className="flex items-start gap-3 bg-[#ffffff] shadow-md p-3 border-1 border-gray-200 rounded-[5px]">
            <div className={`md:h-[45px] md:w-[50px] h-[35px] w-[35px] rounded-full flex flex-col justify-center items-center`}
            style={{backgroundColor :` ${color}30`}}
            >
                <Icon 
                style={{color : `${color}`}}
                className={`md:h-[30px] md:w-[30px] h-[25px] w-[25px]`} />
                </div>
                <div>
                    <h1 className="text-[20px] text-[#112F62] text-[clamp(18px,3.5vw,20px)] font-dm-regular">{title}</h1>
                    <p className="text-[25px] font-dm-bold text-[clamp(20px,4vw,22px)] text-[#000000]">{value}</p>
                </div>
            
        </div>
      
   )
}

export default Cards