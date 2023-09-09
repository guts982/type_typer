"use client";

import { setTaskedTextArray, setTypingStarted } from "@/lib/redux/slices/typerSlice";
import { Button, Link, } from "@nextui-org/react";
import { useDispatch } from "react-redux";


const Navigation = () => {
  const dispatch = useDispatch()
  const handleExit = () => {
      dispatch(setTypingStarted(false));
  }

  return (
    <div className=" bg-[#353E55] p-2 lg:px-10  flex w-full justify-between items-center">
    

          {/* <ScoreSection /> */}

        <Button  className=" border-[#BD574E] text-[#BD574E] font-semibold"
         variant="bordered"
         onClick={handleExit}
         >Exit</Button>

    </div>
  );
};

export default Navigation;

const ScoreSection = () => {

  return <div className="text-white border p-2 rounded-lg">
    <span className=" text-sm">Speed:</span>
    <span className="font-semibold text-md pl-2 text-yellow-500">{ 0 }</span>wps
  </div>
}

