import { MdOutlineArrowDropDown } from "react-icons/md";

interface DropDownProps {
  dropdownData: string[];
  onGetData: (name: string, value: string) => void;
  name: string;
}

const DropDown = ({
  dropdownData,
  onGetData,
  name,
}: DropDownProps) => {
  return (
    <div className="relative w-full">

      {/* Label */}
      <label
        htmlFor={name}
        className="mb-2 block font-dm-regular text-sm text-[#555C6D]"
      >
        {name
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())}
      </label>

      {/* Select */}
      <div className="relative">
        <select
          id={name}
          name={name}
          onChange={(e) => onGetData(name, e.target.value)}
          className="
            h-[42px]
            w-full
            appearance-none
            cursor-pointer
            rounded-[10px]
            border
            border-gray-200
            bg-white
            px-4
            pr-10
            font-dm-regular
            text-[15px]
            text-gray-600
            outline-none
            transition-all
            duration-200
            hover:border-[#B9A8F8]
            focus:border-[#7A4CF5]
            focus:ring-4
            focus:ring-[#7A4CF5]/10
          "
        >
          {dropdownData.map((eachData) => (
            <option
              key={eachData}
              value={eachData}
            >
              {eachData}
            </option>
          ))}
        </select>

        {/* Custom Arrow */}
        <MdOutlineArrowDropDown
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            h-[22px]
            w-[22px]
            -translate-y-1/2
            text-gray-500
          "
        />
      </div>
    </div>
  );
};

export default DropDown;