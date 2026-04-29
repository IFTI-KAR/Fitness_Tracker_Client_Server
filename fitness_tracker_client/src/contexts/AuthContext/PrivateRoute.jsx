import React, { useContext } from 'react'; // ✅ CORRECT

import { AuthContext } from '../AuthContext/AuthProvider';
import { Navigate } from 'react-router';
import Loading from '../../pages/Loading/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext); // ✅ CORRECTED

    //console.log(user)

    if (loading){
        return <Loading></Loading>
    }
    if (user && user?.email){
        return children
    }
    return <Navigate to={"/login"}></Navigate>




    
            

       
    
};

export default PrivateRoute;