import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

export interface IGlobalState {
    showNav:boolean,

}


const initialState: IGlobalState = {
    showNav:true,

}


export const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers: {
        setShowNav:(state, action:PayloadAction<boolean>) => {
            state.showNav = action.payload
        },

    }
});


export const {setShowNav, } = globalSlice.actions
export default globalSlice.reducer







