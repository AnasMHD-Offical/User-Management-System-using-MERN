import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    userData : localStorage.getItem("userData") 
    ? JSON.parse(localStorage.getItem("userData"))
    : null
}
export const UserSlice = createSlice({
    name : "User",
    initialState,
    reducers:{
        setUserData : (state,action)=>{
            state.userData = action.payload;
            localStorage.setItem("userData",JSON.stringify(action.payload))
        },
        logout : (state,action)=>{
            state.userData = null
            localStorage.removeItem("userData")
        }
    }
})

export const {setUserData,logout} = UserSlice.actions

export default UserSlice.reducer