interface StatusProps {
     status : string | undefined
}

const Status = ({status} : StatusProps) =>  {
     

    return (
    <div 
        className="rounded-[20px] h-[30px] flex flex-col justify-center w-[100px] p-2"
        style={{
            backgroundColor : status === 'In Progress' ? '#e3ecff' : status === 'Pending' ? '#fff1d6' :status === 'Completed' ? '#dcf7e6' :status === 'Not Started' ? '#eceef6' : '#ffe0e0'
        }}>
        <h1 className="text-[15px] font-dm-medium text-center"
        style={{
            color : status === 'In Progress' ? '#2b62d9' : status === 'Pending' ? '#c47d0a' : status === 'Completed' ? '#16a05a' : status === 'Not Started' ? '#666d8f' : '#d93a3a'
        }}
        >{status}</h1>
   </div>
)
}

export default Status