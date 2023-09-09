"use client";
import { Fragment, useEffect, useRef } from "react";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Spacer } from "@nextui-org/react";

const Display = () => {
  return (
    <div className="flex-grow h-full w-full flex flex-col">
      <TaskedDisplay />
      <TypedDisplay />
    </div>
  );
};

export default Display;

const TaskedDisplay = () => {
  const taskedTextTitle = useSelector(
    (state: RootState) => state.typer.taskedTextTitle
  );
  const taskedText = useSelector((state: RootState) => state.typer.taskedText);
  const taskedTextArray = useSelector(
    (state: RootState) => state.typer.taskedTextArray
  );
    
  return (
    <div className="p-4  bg-[#39375B] text-white w-full  flex justify-center items-center">
      <div className=" p-4 rounded-md  space-y-1">
        <div className="text-zinc-300 text-[.7rem]">
          {taskedTextArray.length ? taskedTextTitle : ""}
        </div>
        <div className="text-[.9rem]">
          {taskedTextArray.length ? (
            taskedTextArray.map((t, i) => (
              <Fragment key={i}>{t == '\n' ? <br /> : t}</Fragment>
            ))
          ) : (
            <span className="text-yellow-500">Select a paragraph!</span>
          )}
        </div>
      </div>
    </div>
  );
};

const TypedDisplay = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const typedText = useSelector((state: RootState) => state.typer.typedText);
  const typedTextArray = useSelector(
    (state: RootState) => state.typer.typedTextArray
  );

  useEffect(() => {
    // if(ref.current){
    //     ref.current.focus()
    // }
    // console.log(typedTextArray);
  }, [typedText, typedTextArray]);

  return (
    <div
      ref={ref}
      className="flex-grow p-4 bg-[#000000] text-white w-full   flex justify-center items-center "
    >
        <div className="border border-yellow-400 p-4 w-full h-full rounded-md">
        <div className="w-full h-fit   rounded-md items-start justify-start flex flex-wrap  ">
        {typedTextArray.map((char, i) => (
            <Fragment key={i}>
                
          <motion.div
            
            initial={{opacity:0, y: 200, scale: 4, }}
            animate={{opacity:1, y: 0, scale: 1,  }}
            className={` ${char==' ' && "mr-1"} `}
          >
            {char == '\n' ? '' : char}
          </motion.div>
          {char=="\n"&&<br />}
          </Fragment>
        ))}
        <div className="text-red-500 font-semibold animate-ping">|</div>
      </div>
        </div>
     
    </div>
  );
};

// {
//     taskedText.length ? taskedText : <span className='text-yellow-500'>Select a paragraph!</span>
// }
