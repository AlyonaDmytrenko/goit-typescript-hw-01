import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
       const isLoggedIn= useSelector(selectIsLoggedIn);
    if (!isLoggedIn){
    //   toast.error('This is private page for logged')
        return <Navigate to='/login'/>
    }
    
  return children
}

export default PrivateRoute
