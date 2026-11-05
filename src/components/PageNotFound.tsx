import PageNotFoundImage from "../assets/PageNotFoundImage.png"

// interface EmptyStateProps {
//     title : string;
//     value : string;
//     image : string;
// }

const PageNotFound = () =>  {
 return  (
    <div className="flex justify-center flex-col items-center md:mt-10 mt-5 xl:mt-30">
        <h1 className="text-[#7A4CF5] font-dm-bold text-center mb-1 text-[clamp(20px,4.5vw,28px)] tracking-[-1px] md:text-[25px]">Oops! Page Not Found</h1>
        <p className="text-gray-500 md:text-[18px] text-center text-[clamp(15px,3.5vw,28px)] font-dm-bold">The page you’re looking for doesn’t exist or may have been moved. Please check the URL or return to the dashboard.</p>
        
        <div className="flex flex-col items-center">
            <img src={PageNotFoundImage} className={`'md:h-[300px] md:w-[300px] h-[250px] w-[250px]'} `} alt="no data"/>
        </div>
       
    </div>
)
}
export default PageNotFound;