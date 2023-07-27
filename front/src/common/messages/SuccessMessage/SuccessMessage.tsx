import { useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { AppDispatch } from '../../../store/store';
import Button from '../../buttons/Button';
import icon from './../../../assets/img/png/success-icon.png'
import s from './SuccessMessage.module.scss';

type SuccessMessageProps = {
    route?: string;
    handler: () => any;
    message: string | null;
}

const SuccessMessage = ({ route, handler, message }: SuccessMessageProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [anim, setAnim] = useState(false);
    const setSignUpMessage = () => {
        setAnim(true);
    }
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            in={anim}
            timeout={500}
            nodeRef={nodeRef}
            classNames={{
                ...s,
                enterActive: s['enter-active'],
            }}
            onEntered={() => {
                dispatch(handler())
            }}
        >
            <div className={s.container}>
                <div className={s.message} ref={nodeRef}>
                    <h3 className={s.message__header} >Success!</h3>
                    <span>{message}</span>
                    <img className={s.message__icon} src={icon} alt="img" />
                    {route && <Link onClick={setSignUpMessage} className={s.message__btn} to={route} >Continue</Link>}
                    {!route && <Button btnType='button' text='Continue' handler={setSignUpMessage} color="green" />}
                </div >
            </div>

        </CSSTransition >
    )
}

export default SuccessMessage;