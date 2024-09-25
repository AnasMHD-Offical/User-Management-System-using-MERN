import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./Slices/UserSlice"
import AdminSlice from "./Slices/AdminSlice"

const store = configureStore({
    reducer : {
        users : UserReducer,
        admins : AdminSlice
    }
})

export default store
