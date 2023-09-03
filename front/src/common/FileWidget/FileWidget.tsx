import classNames from "classnames";
import s from "./FileWidget.module.scss"

type IFileWidgetProps = {
    text: string;
    img: string;
    handler?: () => void;
    isMute?: boolean;
}

const FileWidget = ({ text, img, handler, isMute }: IFileWidgetProps) => {

    const onClickHandler = () => {
        if (!isMute && handler) handler()
    }

    const widgetStyle = classNames(s.widget, isMute&& s["mute"])

    return (
        <div className={widgetStyle} onClick={onClickHandler} >
            <h3>{text}</h3>
            <img src={img} alt="icon" />
        </div>
    )
}

export default FileWidget;