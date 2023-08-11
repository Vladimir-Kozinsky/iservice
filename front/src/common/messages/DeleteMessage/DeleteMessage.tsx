import Button from '../../buttons/Button';
import bin from './../../../assets/img/png/bin.png'
import s from './DeleteMessage.module.scss';

type DeleteMessageProps = {
    handleBack: (isMess: boolean) => void;
    handleSubmit: (legId: string) => void;
    header: string;
    text: string;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({ handleSubmit, handleBack, header, text }) => {
    return (
        <div className={s.deleteMessage__container} >
            <div className={s.deleteMessage}>
                <img className={s.deleteMessage__icon} src={bin} alt="img" />
                <h3 className={s.deleteMessage__header}>{header}</h3>
                <span>{text}</span>
                <div className={s.deleteMessage__btns} >
                    <Button text="Cancel" handler={handleBack} color='white' btnType="button" />
                    <Button text="Delete" handler={handleSubmit} color='red' btnType="submit" />
                </div>
            </div>
        </div>

    )
}

export default DeleteMessage;