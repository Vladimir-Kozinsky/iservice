import s from './SignUp.module.scss';
import userAvatar from '../../assets/img/png/user-avatar.png'
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../../common/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate, Navigate } from "react-router-dom";
import Input from '../../common/inputs/Input';
import { signUp } from '../../store/reducers/authReducer/authReducer';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { compose } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface ISignUpValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    position: string;
    role: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const errorMessage = useSelector((state: RootState) => state.auth.errorMessage);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const nodeRef = useRef(null);

    useEffect(() => {
        if (isAuth) navigate("/i-service");
    }, [isAuth])

    return (
        <div className={s.signout__container}>
            <div className={s.signout} >
                <div className={s.signout__avatar} >
                    <img className={s.signout__avatar__img} src={userAvatar} alt='avatar' />
                </div>
                <h3 className={s.signout__header}>Create an Account</h3>
                <CSSTransition
                    in={errorMessage ? true : false}
                    nodeRef={nodeRef}
                    timeout={500}
                    classNames={{
                        ...s,
                        enterActive: s['enter-active'],
                    }}
                    unmountOnExit
                >
                    <div ref={nodeRef} className={s.auth__message}>{errorMessage}</div>
                </CSSTransition>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        position: '',
                        role: ''
                    }}
                    validate={values => {
                        interface IErrors {
                            email?: string;
                            password?: string;
                            firstName?: string;
                            lastName?: string;
                            position?: string;
                            role?: string;
                        }
                        const errors: IErrors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) errors.password = 'Password is required';
                        if (!values.firstName) errors.firstName = 'First Name is required';
                        if (!values.lastName) errors.lastName = 'Last Name is required';
                        if (!values.position) errors.position = 'Position is required';
                        if (!values.role) errors.role = 'Role is required';
                        return errors;
                    }}
                    onSubmit={(
                        values: ISignUpValues,
                        { setSubmitting }: FormikHelpers<ISignUpValues>
                    ) => {
                        console.log(values)
                        dispatch(signUp(values));
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={s.auth__form}>
                            <div className={s.auth__form__link}>
                                <label>Email</label>
                                <Field type="email" id="email" name="email"
                                    placeholder="john@acme.com" error={errors.email} as={Input} />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>Password</label>
                                <Field type="password" id="password" name="password"
                                    placeholder="Password" error={errors.password} as={Input} />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>First Name</label>
                                <Field type="text" id="firstName" name="firstName"
                                    placeholder="First Name" error={errors.firstName} as={Input} />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>Last Name</label>
                                <Field type="text" id="lastName" name="lastName"
                                    placeholder="Last Name" error={errors.lastName} as={Input} />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>Position</label>
                                <Field type="text" id="position" name="position"
                                    placeholder="Position" error={errors.position} as={Input} />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>Role</label>
                                <Field type="text" id="role" name="role"
                                    placeholder="Role" error={errors.role} as={Input} />
                            </div>

                            <div className={s.auth__form__btns} >
                                <Button text="Cancel" color="white" btnType="button" handler={() => navigate("/auth")} />
                                <Button text="Sign Up" color="green" btnType="submit" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default SignUp;