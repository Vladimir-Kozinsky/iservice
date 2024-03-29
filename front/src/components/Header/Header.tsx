import { useDispatch, useSelector } from 'react-redux';
import s from './Header.module.scss';
import { AppDispatch } from '../../store/store';
import Button from '../../common/buttons/Button';
import logo from './../../assets/img/png/logo_short.png';
import avatar from './../../assets/img/png/avatar.png';
import { signOut } from '../../store/reducers/authReducer/authReducer';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
    theme?: string
}

const Header = ({ theme }: HeaderProps) => {
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
                <div className={s.header__nav} >
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
