import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
function AdminLoginAuth({children}) {
    const admin = useSelector(state => state?.admins?.AdminData)
    if(admin){
        return <Navigate to={"/admin/dashboard"} />
    }
    return children
}

export default AdminLoginAuth