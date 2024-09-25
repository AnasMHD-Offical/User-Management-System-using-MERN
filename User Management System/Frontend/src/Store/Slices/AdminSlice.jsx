import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    AdminData : localStorage.getItem("AdminData") 
    ? JSON.parse(localStorage.getItem("AdminData"))
    : null
}
export const AdminSlice = createSlice({
    name : "Admin",
    initialState,
    reducers:{
        setAdminData : (state,action)=>{
            state.AdminData = action.payload;
            localStorage.setItem("AdminData",JSON.stringify(action.payload))
        },
        logout : (state,action)=>{
            state.AdminData = null
            localStorage.removeItem("AdminData")
        }
    }
})

export const {setAdminData,logout} = AdminSlice.actions

export default AdminSlice.reducer