import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export const withAuthRedirect = (Component: any) => {
    const RedirectComponent = (props: any) => {
        const isAuth = useSelector((state: any) => state.auth.isAuth)
        const navigate = useNavigate();
        useEffect(() => {
            if (!isAuth) navigate("/auth")
        }, [isAuth])
        return <Component {...props} />
    }
    return RedirectComponent
}