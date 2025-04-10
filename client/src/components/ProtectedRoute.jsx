import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({authUser,children})=>{
    const user = useSelector(state => state.user)
    if(!user){
        return <Navigate to="/login"/>
    }
    if( authUser && !authUser.includes(user.value.role)){
        return <Navigate to="/"/>
    }
    return children
    
}

