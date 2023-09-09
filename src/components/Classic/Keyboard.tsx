"use client";
import {
  Fragment,
  MutableRefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@nextui-org/button";
import { AnimationControls, motion, useAnimationControls } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  appendTypedText,
  appendTypedTextArray,
  popTypedTextArray,
} from "@/lib/redux/slices/typerSlice";
import { MoveLeft, CornerDownLeft, ArrowRightToLine } from "lucide-react";
import { keys } from "./data";
import type { IKey } from "./data";
import { RootState } from "@/lib/redux/store";

// const keys = ["r", "g", "b"];
// Function to find the index of a key (case-insensitive)
function findKeyIndex(key: string) {
  return keys.findIndex(
    (keyboardKey) => keyboardKey.key === key || keyboardKey.alt === key
  );
}

const Keyboard = () => {
  const [pressed, setPressed] = useState("");
  const [capsOn, setCapsOn] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [down, setDown] = useState("");
  const [up, setUp] = useState("");
  const taskedTextArray = useSelector((state:RootState)=>state.typer.taskedTextArray)
  const keyboardRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch();

  const keysRef = useRef<Array<HTMLElement | SVGElement | null>>([]);
  //   const controls = useAnimationControls();
  const animationControlsArray = Array.from({ length: keys.length }, () =>
    useAnimationControls()
  );

  const handleButtonClick = (
    key: string,
    type: "press" | "down" | "up" = "press"
  ) => {
    if (key == " ") key = "Space";
    const keyIndex = findKeyIndex(key);
    if (keyIndex == -1) return;

    const handleSpecialKeysAnimation = (
      keyName: string,
      type: "down" | "press" | "up"
    ) => {
      //handle shift and control duplications
      if (keyName == "Shift" || keyName == "Control") {
        // Filter for Shift keys
        const shiftKeys = keys.filter(
          (keyData) => keyData.key === keyName || keyData.alt === keyName
        );
        // Extract the IDs of Shift keys
        const shiftKeyIds = shiftKeys.map((keyData) => {
          return keyData.id;
        });
        clickAnimation(shiftKeyIds[0], type);
        clickAnimation(shiftKeyIds[1], type);
      }
    };

    switch (type) {
      case "press":
        setPressed(key);
        if (key == " ") {
          const keyIndex = findKeyIndex("Space");
          clickAnimation(keyIndex, "press");
        }
        clickAnimation(keyIndex, "press");
        break;
      case "down":
        setDown(key);
        if (key == "Shift") setShiftPressed(true);
        if (key == "CapsLock") setCapsOn((o) => !o);
        handleSpecialKeysAnimation(key, "down");
        clickAnimation(keyIndex, "down");
        updateDisplay(key);
        break;
      case "up":
        if (key == "Shift") setShiftPressed(false);
        setUp(key);
        handleSpecialKeysAnimation(key, "up");
        clickAnimation(keyIndex, "up");
        break;
      default:
        // console.log("default ", key);

        break;
    }

  };

  const clickAnimation = (keyIndex: number, type: "press" | "down" | "up") => {
    animationControlsArray[keyIndex].start((param) => ({
      scale: type == "press" || type == "down" ? 1.2 : 1,
      backgroundColor:
        type == "press" || type == "down" ? "rgb(255,0,0)" : "rgb(0,0,0)",
      transition: { type: "spring", stiffness: 300, mass: 1 },
    }));
  };

  const handleKeydown = (e: KeyboardEvent) => {
    handleButtonClick(e.key, "down");
  };

  const handleKeypress = (e:  KeyboardEvent) => {
    handleButtonClick(e.key, "press");
  };

  const handleKeyup = (e: KeyboardEvent) => {
    handleButtonClick(e.key, "up");
  };

  const variants = {
    hidden: {
      y: 0,
    },
    show: {
      y: 10,
    },
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keypress", handleKeypress);
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keypress", handleKeypress);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  const updateDisplay = (char: string) => {
    if (
      !isAlphaNumericSpecial(char) &&
      char != "Space" &&
      char != "Tab" &&
      char != "Enter" &&
      char != "Backspace"
    )
      return;

    if (char == "Space") char = " ";
    if (char == "Tab") char = " ";
    if (char == "Enter") char = "\n";
    if (char == "Backspace") {
      dispatch(popTypedTextArray());
    } else {
      dispatch(appendTypedTextArray(char));
      dispatch(appendTypedText(char));
    }
  };

  useEffect(()=>{
    if(keyboardRef.current) {
      // console.log("down changed");
      keyboardRef.current.focus()
      keyboardRef.current.click()
    }
  },[taskedTextArray,down])

  return (
    <div className="flex justify-center items-center w-full bg-[#39375B] sm:py-2 md:py-3 lg:py-4 xl:py-8  ">
      <div ref={keyboardRef}
        className="rounded-md h-fit p-2 md:py-3 xl:p-4 w-fit bg-[#39375B] flex flex-col 
        gap-[2.5px] md:gap-[4px] xl:gap-2 justify-center items-center 
        "
        style={
          {
          boxShadow:
            "#000000 3px 3px 6px 0px inset, #000000 -3px -3px 6px 1px inset",
        }
      }
      >
        <div className="flex gap-[2.5px] md:gap-[4px] xl:gap-[6px]  ">
          {keys.slice(0, 14).map((key) => (
            <Fragment key={key.id}>
              <KeyButton
                up={up}
                down={down}
                capsOn={capsOn}
                shiftPressed={shiftPressed}
                btnKey={key}
                variants={variants}
                keysRef={keysRef}
                handleButtonClick={handleButtonClick}
                animationControlsArray={animationControlsArray}
              />
            </Fragment>
          ))}
        </div>

        <div className="flex gap-[2.5px] lg:gap-2  ">
          {keys.slice(14, 28).map((key) => (
            <Fragment key={key.id}>
              <KeyButton
                up={up}
                down={down}
                capsOn={capsOn}
                shiftPressed={shiftPressed}
                btnKey={key}
                variants={variants}
                keysRef={keysRef}
                handleButtonClick={handleButtonClick}
                animationControlsArray={animationControlsArray}
              />
            </Fragment>
          ))}
        </div>

        <div  className="flex gap-[2.5px] lg:gap-2  ">
          {keys.slice(28, 41).map((key) => (
            <Fragment key={key.id}>
              <KeyButton
                up={up}
                down={down}
                capsOn={capsOn}
                shiftPressed={shiftPressed}
                btnKey={key}
                variants={variants}
                keysRef={keysRef}
                handleButtonClick={handleButtonClick}
                animationControlsArray={animationControlsArray}
              />
            </Fragment>
          ))}
        </div>

        <div className="flex gap-[2.5px] lg:gap-2  ">
          {keys.slice(41, 53).map((key) => (
            <Fragment key={key.id}>
              <KeyButton
                up={up}
                down={down}
                capsOn={capsOn}
                shiftPressed={shiftPressed}
                btnKey={key}
                variants={variants}
                keysRef={keysRef}
                handleButtonClick={handleButtonClick}
                animationControlsArray={animationControlsArray}
              />
            </Fragment>
          ))}
        </div>

        <div className="flex gap-[2.5px] lg:gap-2  ">
          {keys.slice(53, 56).map((key) => (
            <Fragment key={key.id}>
              <KeyButton
                up={up}
                down={down}
                capsOn={capsOn}
                shiftPressed={shiftPressed}
                btnKey={key}
                variants={variants}
                keysRef={keysRef}
                handleButtonClick={handleButtonClick}
                animationControlsArray={animationControlsArray}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;

const KeyButton = ({
  up,
  down,
  capsOn,
  shiftPressed,
  btnKey,
  keysRef,
  handleButtonClick,
  animationControlsArray,
  variants,
}: {
  up: string;
  down: string;
  capsOn: boolean;
  shiftPressed: boolean;
  btnKey: (typeof keys)[0];
  keysRef: MutableRefObject<(HTMLElement | SVGElement | null)[]>;
  handleButtonClick: (key: string) => void;
  animationControlsArray: AnimationControls[];
  variants: any;
}) => {
  const caps = capsOn
    ? shiftPressed
      ? false
      : true
    : shiftPressed
    ? true
    : false;
  return (
    <motion.button
      // variants={variants}
      // ${((btnKey.key==up)) ? "bg-blue-500" : ""}
      className={`px-2 lg:py-2 lg:px-4 rounded-lg
         text-white focus:outline-none border-2
        ${shiftPressed && btnKey.key == "Shift" ? "bg-red-500" : ""}
        ${capsOn && btnKey.key == "CapsLock" ? "bg-red-500" : ""}
        
   `}
      initial={{ backgroundColor: "rgb(0,0,0)" }}
      ref={(el) => (keysRef.current[btnKey.id] = el)}
      onClick={() => handleButtonClick(caps ? btnKey.alt : btnKey.key)}
      animate={animationControlsArray[btnKey.id]}
    >
      {!isAlpha(btnKey.key) && btnKey.key != btnKey.alt ? (
        <div
          className={` flex   ${
            caps ? "flex-row-reverse" : ""
          } text-[.6rem] justify-start items-start gap-[2px] md:gap-[4px] xl:gap-2 `}
        >
          <span
            className={` ${
              caps ? " text-[.6rem]" : "text-[.8rem] xl:text-[1rem]"
            } `}
          >
            {btnKey.key}
          </span>
          <span
            className={` ${
              caps ? " text-[.8rem] xl:text-[1rem]" : " text-[.6rem]"
            } `}
          >
            {btnKey.alt}
          </span>
        </div>
      ) : (
        <div className="text-[.8rem] xl:text-[1rem]">
          {caps ? (
            btnKey.alt == "Backspace" ? (
              <MoveLeft />
            ) : btnKey.alt == "Enter" ? (
              <CornerDownLeft />
            ) : btnKey.alt == "Tab" ? (
              <ArrowRightToLine />
            ) : btnKey.alt == "CapsLock" ? (
              "Caps"
            ) : (
              btnKey.alt
            )
          ) : btnKey.key == "Backspace" ? (
            <MoveLeft />
          ) : btnKey.key == "Enter" ? (
            <CornerDownLeft />
          ) : btnKey.key == "Tab" ? (
            <ArrowRightToLine />
          ) : btnKey.key == "CapsLock" ? (
            "Caps"
          ) : (
            btnKey.key
          )}
        </div>
      )}
    </motion.button>
  );
};

function isAlpha(character: string) {
  // Use a regular expression to check if the character is a letter (uppercase or lowercase).
  const regex = /^[a-zA-Z]$/;
  return regex.test(character);
}

// Regular expression to match alphanumeric characters and special characters

function isAlphaNumericSpecial(character: string) {
  const regex = /^[0-9a-zA-Z!@#$%^&=*()_+`~{}\[\]:;"'<>,.?/|\\-]$/;
  // Filter the keyboardKeyData array for alphanumeric and special characters
  // const filteredKeyData = keys.filter((keyData) => {
  //     return regex.test(keyData.key) || regex.test(keyData.alt);
  // });
  return regex.test(character) || regex.test(character);
}
