interface PrograssProps {
    prograss  : number | undefined
}

const Prograss = ({prograss} : PrograssProps) => (
    <div style={{
        backgroundColor : '#eceefa',
        height : 8,
        width : '100%',
        borderRadius : 15
    }}>

    <div style={{
            width : `${prograss}%`,
            borderRadius : 15,
            height : 8
    }} className="bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff]"/>
    </div>
)

export default Prograss;