import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
function AdminAuth({children}) {
    const admin = useSelector(state => state?.admins?.AdminData)
    if(!admin){
        return <Navigate to={"/admin/login"} />
    }
    return children
}

export default AdminAuth