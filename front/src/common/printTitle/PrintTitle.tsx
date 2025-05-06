
import React from 'react';
import s from './PrintTitle.module.scss';
import classNames from 'classnames';


type PrintTitlePropsType = {
    text: {
        title: string,
        value: string,
    }
}



const PrintTitle: React.FC<PrintTitlePropsType> = ({ text }) => {

    return (
        <div className={classNames(s.title, s[`title__${text.title}`])}>
            <span>{text.value}</span>
        </div>
    )
}

export default PrintTitle;