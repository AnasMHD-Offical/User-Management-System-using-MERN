import React from 'react'
import { Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
function UserLoginAuth({children}) {
    const user = useSelector(state => state?.users?.userData)
        if(user){
            return <Navigate to={"/"}/>
        }
        return children
}

export default UserLoginAuth