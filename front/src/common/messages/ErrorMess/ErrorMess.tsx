import { useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { AppDispatch } from '../../../store/store';
import Button from '../../buttons/Button';
import icon from './../../../assets/img/png/fail-icon.png'
import s from './ErrorMess.module.scss'

type ErrorMessageProps = {
    route?: string;
    handler: () => any;
    message: string | null;
}

const ErrorMess = ({ route, handler, message }: ErrorMessageProps) => {
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
                console.log('heandler')
                dispatch(handler())
            }}
        >
            <div className={s.container} ref={nodeRef}>
                <div className={s.message} >
                    <h3 className={s.message__header} >Error!</h3>
                    <span>{message}</span>
                    <img className={s.message__icon} src={icon} alt="img" />
                    <Button btnType='button' text='Continue' handler={setSignUpMessage} color="green" />
                </div >
            </div >

        </CSSTransition >
    )
}

export default ErrorMess;