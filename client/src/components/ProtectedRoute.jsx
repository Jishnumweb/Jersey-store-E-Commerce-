import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({authUser,children})=>{
    const role = localStorage.getItem("role")
    if(!role){
        return <Navigate to="/login"/>
    }
    if( authUser && !authUser.includes(role)){
        return <Navigate to="/"/>
    }
    return children
    
}

