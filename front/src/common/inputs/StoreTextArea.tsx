import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import s from './StoreTextArea.module.scss'

type transitionStylesType = {
    entering: { [key: string]: string };
    entered: { [key: string]: string };
    exiting: { [key: string]: string };
    exited: { [key: string]: string };
    unmounted?: { [key: string]: string };
}

const transitionStyles: transitionStylesType = {
    entering: { opacity: '1' },
    entered: { opacity: '1' },
    exiting: { opacity: '0' },
    exited: { opacity: '0' },
};

const StoreTextArea: React.FC<any> = (props) => {
    const nodeRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (props.error) setErrorMessage(props.error)
    }, [props.error])
    
    return (
        <div className={s.textarea}>
            <textarea className={s.textarea__field} {...props} />
            <Transition
                nodeRef={nodeRef}
                in={props.error ? true : false}
                timeout={500}
                onExited={() => setErrorMessage(null)}
                unmountOnExit >
                {(state: TransitionStatus) => (
                    <div className={s.textarea__message} ref={nodeRef} style={{
                        ...transitionStyles[state]
                    }} >
                        <div className={s.textarea__message__triangle}></div>
                        <div className={s.textarea__message__block}>
                            <p>{errorMessage}</p>
                        </div>
                    </div >
                )}
            </Transition>
        </div >
    )
}

export default StoreTextArea;