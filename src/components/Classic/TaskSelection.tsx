"use client";

import { Button, Select, SelectItem, Link } from "@nextui-org/react";
import { paragraphs } from "./data";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NextLink from "next/link";
import {
  setTaskedText,
  setTaskedTextArray,
  setTaskedTextTitle,
  setTypedText,
  setTypedTextArray,
  setTypingStarted,
} from "@/lib/redux/slices/typerSlice";
import { splitParagraphIntoCharacters } from "@/lib/utils";
import type { Selection } from "@nextui-org/react";
import { RootState } from "@/lib/redux/store";

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

const TaskSelection = () => {
  const taskedTextArray = useSelector(
    (state: RootState) => state.typer.taskedTextArray
  );
  const taskedTextTitle = useSelector(
    (state: RootState) => state.typer.taskedTextTitle
  );
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleSelectionChange = (keys: Selection) => {
    //@ts-ignore
    const paragraph = paragraphs[keys.currentKey];
    dispatch(setTaskedText(paragraph.paragraph));
    dispatch(setTaskedTextTitle(paragraph.title));
    dispatch(
      setTaskedTextArray(splitParagraphIntoCharacters(paragraph.paragraph))
    );
    dispatch(setTypedText(""));
    dispatch(setTypedTextArray([]));

    if (ref.current) {
      //@ts-ignore
      ref.current.blur();
    }
  };

  const handleStartTyping = () => {
    if (taskedTextArray.length) dispatch(setTypingStarted(true));
  };

  return (
    <div className="w-screen h-screen bg-[#C84361] flex justify-center items-center flex-col gap-4">
      <Select
        ref={ref}
        color="primary"
        items={paragraphs}
        variant="flat"
        label="Paragraphs"
        placeholder="Select a paragraph"
        className=" w-48 lg:w-64  focus:outline-none text-white placeholder:text-yellow-400"
        onSelectionChange={handleSelectionChange}
      >
        {(paragraph) => (
          <SelectItem
            key={paragraph.id}
            classNames={{
              wrapper: " bg-red-500 ",
              base: "bg-red-500 ",
              title: "text-green-500 ",
              description: "bg-red-500 ",
            }}
          >
            {paragraph.title}
          </SelectItem>
        )}
      </Select>

      <div className=" p-4 rounded-md  space-y-1 max-w-lg bg-gradient-to-tr from-slate-500 to-slate-950 ">
        <div className="text-zinc-100 text-[.8rem]  w-full">Preview</div>
        <div className="text-zinc-300 text-[.7rem]">
          {taskedTextArray.length ? taskedTextTitle : ""}
        </div>
        <div className="text-[.9rem] text-white">
          {taskedTextArray.length ? (
            taskedTextArray.map((t, i) => (
              <Fragment key={i}>{t == "\n" ? <br /> : t}</Fragment>
            ))
          ) : (
            <span className="text-zinc-200">Nothing Selected!</span>
          )}
        </div>
      </div>

      <Button
        className="bg-gradient-to-tr from-blue-400 to-indigo-600 text-white shadow-lg hover:from-blue-500
         hover:to-black disabled:from-slate-400 disabled:to-slate-500
         px-4 lg:px-10 xl:px-20"
        onClick={handleStartTyping}
        disabled={!taskedTextArray.length}
      >
        Start Typin!
      </Button>

      <div className=" p-4">
        <div className="flex gap-2  ">
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

export default TaskSelection;
