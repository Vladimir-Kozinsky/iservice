import s from "./FileWidget.module.scss"

type IFileWidgetProps = {
    text: string;
    img: string;
    handler?: () => void;
}

const FileWidget = ({ text, img, handler }: IFileWidgetProps) => {

    return (
        <div className={s.widget} onClick={handler} >
            <h3>{text}</h3>
            <img src={img} alt="icon" />
        </div>
    )
}

export default FileWidget;