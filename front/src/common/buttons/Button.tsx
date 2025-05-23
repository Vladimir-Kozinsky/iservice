import classNames from "classnames";
import s from "./Button.module.scss"

type ButtonProps = {
    text: string;
    color: "white" | "green" | "white__dark" | "red";
    btnType: "button" | "submit" | "reset";
    handler?: (value?: any) => void;
    state?: any;
    width?: string;
    height?: string;
    fontSize?: string;
    disabled?: boolean;
}



const Button = ({ text, color, btnType, handler, state, width, height, fontSize, disabled }: ButtonProps) => {

    const styles = {
        width: width ? `${width}` : '',
        height: height ? `${height}` : '',
        fontSize: fontSize ? `${fontSize}` : ''
    }
    return (
        <button disabled={disabled ? true : false}
            style={styles} type={btnType}
            className={classNames(s.button, s[`button__${color}`])}
            onClick={handler}>{text}</button>
    )
}

export default Button;