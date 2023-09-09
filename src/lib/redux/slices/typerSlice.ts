import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const a = Date.now()

export interface ITyperState {
    resultReady:boolean,
    startTime: number,
    currentTime:number,
    endTime: number,
    typingStarted: boolean;
    taskedTextTitle: string,
    taskedText: string,
    taskedTextArray: string[],
    typedText: string,
    typedTextArray: string[],

}
const initialState: ITyperState = {
    resultReady:false,
    startTime:0,
    currentTime:0,
    endTime:0,
    typingStarted: false,
    taskedTextTitle: "",
    taskedText: "",
    taskedTextArray: [],
    typedText: "",
    typedTextArray: [],
}

export const typerSlice = createSlice({
    name: "typer",
    initialState,
    reducers: {
        setTypingStarted: (state, action: PayloadAction<boolean>) => {
            state.typingStarted = action.payload
            if(!action.payload) {
                //reset everything upon exit
                state.resultReady = false
                state.taskedTextTitle = ""
                state.taskedText = ""
                state.taskedTextArray = []
                state.typedTextArray = []
                state.typedText = ""
            } else {
                //start with new task
                state.typedText = ""
                state.typedTextArray = []
            }
        },
        setTaskedTextTitle: (state, action: PayloadAction<string>) => {
            state.taskedTextTitle = action.payload
        },
        setTaskedText: (state, action: PayloadAction<string>) => {
            state.taskedText = action.payload
        },
        setTaskedTextArray: (state, action: PayloadAction<string[]>) => {
            state.taskedTextArray = action.payload
        },
        setTypedText: (state, action: PayloadAction<string>) => {
            state.typedText = action.payload
        },
        appendTypedText: (state, action: PayloadAction<string>) => {
            state.typedText += action.payload
        },
        setTypedTextArray: (state, action: PayloadAction<string[]>) => {
            state.typedTextArray = action.payload
        },
        appendTypedTextArray: (state, action: PayloadAction<string>) => {
            if(!state.typedTextArray.length) {
                state.startTime = Date.now()
            }
            state.typedTextArray.push(action.payload)
            if(state.typedTextArray.length >= state.taskedTextArray.length) {
                state.endTime = Date.now()
                state.resultReady = true;
            }
        },
        popTypedTextArray: (state) => {
            state.typedTextArray.pop()
        },
        resetAll:(state) => {
            state.typingStarted = false
            state.startTime = 0
            state.endTime = 0
            state.resultReady = false
            state.taskedTextTitle = ""
            state.taskedText = ""
            state.taskedTextArray = []
            state.typedTextArray = []
            state.typedText = ""
        },
        
    }
});


export const {
    setTypingStarted,
    setTaskedTextTitle,
    setTaskedText,
    setTaskedTextArray,
    setTypedText,
    appendTypedText,
    setTypedTextArray,
    appendTypedTextArray,
    popTypedTextArray,
    resetAll
} = typerSlice.actions
export default typerSlice.reducer







