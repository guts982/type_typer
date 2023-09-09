"use client"

import {Link , Button} from "@nextui-org/react";
import { RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import NextLink from "next/link";
import { resetAll } from "@/lib/redux/slices/typerSlice";


const links = [
    {
      id: 0,
      label: "Home",
      path: "/",
    },
    {
      id: 1,
      label: "Switch to 3d",
      path: "/3d",
    },
  ];
  

const Results = () => {
    const dispatch = useDispatch()
    const startTime = useSelector((state:RootState)=>state.typer.startTime)
    const endTime = useSelector((state:RootState)=>state.typer.endTime)
    const taskedTextArray = useSelector((state:RootState)=>state.typer.taskedTextArray)
    const typedTextArray = useSelector((state:RootState)=>state.typer.typedTextArray)

    const diffSeconds = Math.round((endTime-startTime)/1000); 
    const minutes = Math.round(diffSeconds/60)
    const diffMinutes = Number((diffSeconds/60).toFixed(2));
    const fomattedDiff = minutes + `${minutes>1?" minutes ":" minute "}` +diffSeconds%60 + ` ${diffSeconds%60>1?" seconds":" second"} `

    const taskedWordsArray = getWordsArray(taskedTextArray)
    const typedWordsArray = getWordsArray(typedTextArray)

    const wpm = Math.round(typedWordsArray.length/diffMinutes)

    const taskedLettersArray = getLettersArray(taskedTextArray)
    const typedLettersArray = getLettersArray(typedTextArray)

    const lpm = Math.round(typedLettersArray.length/diffMinutes)

    const handleRestartClassic = () => {
        dispatch(resetAll())
    }

    return (
        <div className="w-screen h-screen bg-[#C84361] flex justify-center items-center flex-col gap-4">
            <h2 className="font-semibold text-lg xl:text-xl">Results</h2>
            <div>
                <span className="mr-2">Start Time:</span>
                <span className="font-bold text-lg text-yellow-500">{getFormattedTime(startTime)}</span>
            </div>
            <div>
                <span className="mr-2">End Time:</span>
                <span className="font-bold text-lgtext-yellow-500">{getFormattedTime(endTime)}</span>
            </div>
            <div>
                <span className="mr-2">Total Time:</span>
                <span className="font-bold text-lgtext-yellow-500">{fomattedDiff} , {diffMinutes}</span>
            </div>
            <div>
                <span className="mr-2">Tasked Word Count:</span>
                <span className="font-bold text-lgtext-yellow-500">{taskedWordsArray.length} </span>
            </div>
            <div>
                <span className="mr-2">Typed Word Count:</span>
                <span className="font-bold text-lgtext-yellow-500">{typedWordsArray.length}</span>
            </div>
            <div>
                <span className="mr-2">Words Per minute:</span>
                <span className="font-bold text-lgtext-yellow-500">{wpm}</span>
            </div>
            <div>
                <span className="mr-2">Characters Per minute:  </span>
                <span className="font-bold text-lgtext-yellow-500">{lpm}</span>
            </div>


            <div className=" p-4">
                <div className="flex gap-2  ">
                    <Button onClick={handleRestartClassic} variant="flat" color="secondary">Restart Classic</Button>
                {links.map((link) => (
                    <Link
                    href={link.path}
                    key={link.id}
                    as={NextLink}
                    underline="hover"
                    isBlock
                    showAnchorIcon
                    color="foreground"
                    className="  p-2 rounded-md font-semibold"
                    >
                    {link.label}
                    </Link>
                ))}
        </div>
      </div>

        </div>
    );
};

export default Results;


const getWordsArray = (charArray:string[]) => {

    let words:string[] = []
    let word = "";
    charArray.forEach(char => {
      
        if(char != '\n' && char != ' ') {
            word += char
        } else {
            words.push(word)
            word = ""
        }
    });
    return words
}

const getLettersArray = (charArray:string[]) => {

    let letters:string[] = []
    charArray.forEach(char => {
      
        if(char != '\n' && char != ' ') {
            letters.push(char)
        } 
    });
    return letters
}


const getFormattedTime = (timestamp:number) => {
    let unix_timestamp = timestamp
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime

}

