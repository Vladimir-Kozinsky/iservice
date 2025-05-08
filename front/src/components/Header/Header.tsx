import { useDispatch, useSelector } from 'react-redux';
import s from './Header.module.scss';
import { AppDispatch } from '../../store/store';
import Button from '../../common/buttons/Button';
import logo from './../../assets/img/png/logo.png'
import avatar from './../../assets/img/png/avatar.png';
import { signOut } from '../../store/reducers/authReducer/authReducer';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';

type HeaderProps = {
    theme?: string
}

const Header = ({ theme }: HeaderProps) => {
    const [isMenu, setIsMenu] = useState(false)
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const logout = () => {
        dispatch(signOut());
    }
    const color = theme === "white" ? "white" : "white__dark"
    return (
        <div className={s.header}>
            <div className={s.header_container} >
                <div className={s.header__logo}>
                    <img src={logo} alt='logo' />
                    <h2 className={s.header__logo__title} >I-Service</h2>
                </div>

                <div className={s.nav__wrapper} >
                    <nav className={classNames(s.headerMain__nav, isMenu && s.active)}>
                        <ul>
                            <li><NavLink className={classNames(s.headerMain__nav__link, s.headerMain__nav__profile)} to="profile">Profile</NavLink></li>
                            <li><NavLink className={s.headerMain__nav__link} to="/">Store</NavLink></li>
                            <li><NavLink className={s.headerMain__nav__link} to="tools">Tools</NavLink></li>
                            <li><NavLink className={s.headerMain__nav__link} to="requests">Requests</NavLink></li>
                            <li> <Button text='Log Out' color={color} btnType='button' handler={logout} /></li>
                        </ul>
                    </nav>
                    <div className={classNames(s.burger__icon, isMenu && s.active)} onClick={isMenu ? () => setIsMenu(false) : () => setIsMenu(true)} >
                        <span className={classNames(s.burger__icon__line, s.first)} ></span>
                        <span className={classNames(s.burger__icon__line, s.second)} ></span>
                        <span className={classNames(s.burger__icon__line, s.third)} ></span>
                    </div>
                </div>
                <div className={s.profile__wrapper}>
                    <NavLink className={s.link} to="profile">
                        <div className={s.link__imgWrap}  >
                            <img src={avatar} alt="user-avatar" />
                        </div>
                        <span>{`${user.firstName} ${user.lastName}`}</span>
                    </NavLink>
                    <Button text='Log Out' color={color} btnType='button' handler={logout} />

                </div>


            </div>
        </div>
    )
}

export default Header;
