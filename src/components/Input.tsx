interface inputProps {
    onGetData : (name : string ,value : string) =>void
    type : string,
    name : string,
    value : string | number
}

const Input = ({onGetData , type , name , value} : inputProps) => {

     return (
          <div className="mt-1">
                <label className="mb-2 block font-dm-regular text-sm  text-[#555C6D]">
                  {name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
               </label>
               {
                    type === 'tel' ? (
                       
                         <input type={type} 
                         className="h-[40px] w-[100%] focus:border-[#7A4CF5]  focus:ring-2 focus:ring-[#7A4CF5]/20  border-1 border-gray-200 rounded-[10px] p-[15px]
                         text-[#000000] text-[15px]  outline-none transition
                         "
                         onChange={(e) => {
                         const value = e.target.value.replace(/\D/g, "");
                         onGetData(name, value);
                         }}
                         value={value}
                         maxLength={10}
                         inputMode="numeric"
               />

                    ) :(

                    <input type={type} 
                    className="h-[40px] w-[100%] focus:border-[#7A4CF5]  focus:ring-2 focus:ring-[#7A4CF5]/20  border-1 border-gray-200 rounded-[10px] p-[15px]
                    text-[#000000] text-[15px]  outline-none transition
                    "
                    onChange={(e) => onGetData(name , e.target.value)}
                    value={value}
                    />
                    )
               }
              
          </div>
     )
}

export default Input