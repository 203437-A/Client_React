import React from "react";
import { Navigate } from "react-router-dom";
export default function Home(){
    return(
        <div>
            {!localStorage.getItem('token') && <Navigate to={'/login'}/>}
        </div>
    );
}