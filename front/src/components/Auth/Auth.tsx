import React, { useEffect, useRef, useState } from "react"
import s from "./Auth.module.scss"
import { CSSTransition, Transition } from "react-transition-group";
import Loader from "../../common/Loader/Loader";
import classNames from "classnames";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signIn } from "../../store/reducers/authReducer/authReducer";
import Button from "../../common/buttons/Button";
import Input from '../../common/inputs/Input';
import { useNavigate } from "react-router-dom";
import { compose } from "@reduxjs/toolkit";
import { withAuthRedirect } from "../HOC/withAuthRedirect";

export interface IAuthValues {
    email: string;
    password: string;
}

const Auth: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isAuthError, setIsAuthError] = useState();
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const isAuth = useSelector((state: any) => state.auth.isAuth);
    const authErrorMessage = useSelector((state: any) => state.auth.authErrorMessage);
    const nodeRef = useRef(null);
    useEffect(() => {
        if (isAuth) navigate("/dashboard");
        if (authErrorMessage) setIsAuthError(authErrorMessage);
    }, [isAuth, authErrorMessage])

    return (
        <div className={s.auth__container}>
            <div className={s.background__circle}></div>
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <div className={s.auth}>
                <h4 className={classNames(s.auth__header, s.auth__header__welcome)}>Welcome back!</h4>
                <h3 className={classNames(s.auth__header, s.auth__header__signin)}>Sign in to your account</h3>
                <h5 className={classNames(s.auth__header, s.auth__header__signup)}>Don't have an account? <br /> Please contact New Way Cargo Airlines team.</h5>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validate={values => {
                        interface IAuth {
                            email?: string;
                            password?: string;
                        }
                        const errors: IAuth = {};
                        if (!values.email) errors.email = 'Email is required';
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address';
                        if (!values.password) errors.password = 'Password is required';
                        return errors;
                    }}
                    onSubmit={(
                        values: IAuthValues,
                        { setSubmitting }: FormikHelpers<IAuthValues>
                    ) => {
                        (async () => {
                            setIsLoader(true);
                            await dispatch(signIn(values));
                            setIsLoader(false);
                        })()

                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <Form className={s.auth__form}>
                        <CSSTransition
                            in={isAuthError? true : false}
                            nodeRef={nodeRef}
                            timeout={500}
                            classNames={{
                                ...s,
                                enterActive: s['enter-active'],
                            }}
                            unmountOnExit
                        >
                            <div ref={nodeRef} className={s.auth__message}>{authErrorMessage}</div>
                        </CSSTransition>
                        <div className={s.auth__form__block}>
                            <Field type="email" id="email" name="email" placeholder="john@acme.com" error={errors.email} as={Input} />
                        </div>
                        <div className={s.auth__form__block}>
                            <Field type="password" id="password" name="password" placeholder="Password" error={errors.password} as={Input} />
                        </div>
                        <Button text="Login" color="green" btnType="submit" />
                    </Form>
                )}
                </Formik>
            </div >
        </div >
    )
}

export default Auth ;