import {toast} from "react-toastify"
const handleSuccess = (msg) =>{
    toast.success(msg,{
        position : "top-center"
    })
}
const handleError = (msg) =>{
    toast.error(msg,{
        position : "top-center"
    })
}
const handleInfo = (msg) =>{
    toast.info(msg,{
        position : "top-center"
    })
}
export {
    handleError,
    handleSuccess,
    handleInfo
}