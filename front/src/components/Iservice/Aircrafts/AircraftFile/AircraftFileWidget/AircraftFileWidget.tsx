import s from "./AircraftFileWidget.module.scss"

type IAircraftFileWidgetProps = {
    text: string;
    img: string;
    handler: () => void;
}

const AircraftFileWidget = ({ text, img, handler }: IAircraftFileWidgetProps) => {

    return (
        <div className={s.widget} onClick={handler} >
            <h3>{text}</h3>
            <img src={img} alt="icon" />
        </div>
    )
}

export default AircraftFileWidget;