"use client"

import Keyboard from "./Keyboard";
import Display from "./Display";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import TaskSelection from "./TaskSelection";
import Results from "./Results";



const Classic = () => {
    const typingStarted = useSelector((state:RootState)=>state.typer.typingStarted)
    const resultReady = useSelector((state:RootState)=>state.typer.resultReady)
    const taskedTextArray = useSelector((state:RootState)=>state.typer.taskedTextArray)
    
    if(resultReady)
        return <Results />

    if(!typingStarted)
        return <TaskSelection />

    return (
        <div className=" flex flex-col h-screen w-screen">

            

            <Display />
         
            <Keyboard />
           
            <Navigation />


        </div>
    );
};

export default Classic;



