import { useNavigate } from "react-router-dom";
import s from "./Profile.module.scss";
import React from "react";
import Button from "../../../common/buttons/Button";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";



const Profile: React.FC = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className={s.profile} >
            <h1 className={s.profile__header}>Profile</h1>
            <div className={s.user} >
                <div className={s.user__block} >
                    <span className={s.user__block__title}>First Name</span>
                    <span>{user.firstName}</span>
                </div>
                <div className={s.user__block} >
                    <span className={s.user__block__title}>Last Name</span>
                    <span>{user.lastName}</span>
                </div>
                <div className={s.user__block} >
                    <span className={s.user__block__title}>E-mail</span>
                    <span>{user.email}</span>
                </div>
                <div className={s.user__block} >
                    <span className={s.user__block__title}>Position</span>
                    <span>{user.position}</span>
                </div>
                <div className={s.user__block} >
                    <span className={s.user__block__title}>Role</span>
                    <span>{user.role}</span>
                </div>
                <div className={s.user__block} >
                    <span className={s.user__block__title}>Activated</span>
                    <span>{user.isActivated ? "Yes" : "No"}</span>
                </div>
            </div>
            <div className={s.profile__buttons} >
                <Button text="Back"
                    color="white"
                    btnType={"button"}
                    handler={() => navigate('/i-service')} />
                {user.role === "admin" && <Button text="Add User"
                    color="green"
                    btnType={"button"}
                    handler={() => navigate('/signup')} />}
            </div>




        </div>
    )
}

export default Profile;