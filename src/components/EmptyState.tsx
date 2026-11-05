interface EmptyStateProps {
    title : string;
    value : string;
    image : string;
}

const EmptyState = ({title , value , image} : EmptyStateProps) =>  {
 return  (
    <div className="flex justify-center flex-col items-center mt-5  xl:mt-30">
        <h1 className="text-[#7A4CF5] font-dm-bold text-center mb-1 text-[clamp(20px,4.5vw,28px)] tracking-[-1px] md:text-[25px]">{title}</h1>
        <p className="text-gray-500 md:text-[18px] text-center text-[clamp(15px,3.5vw,28px)] font-dm-bold">{value}</p>
        
        <div className="flex flex-col items-center">
            <img src={image} className={`${title === 'No Clients Yet' ? 'h-[380px] w-[380px]' : 'md:h-[300px] md:w-[300px] h-[250px] w-[250px]'} `} alt="no data"/>
        </div>
       
    </div>
)
}
export default EmptyState;