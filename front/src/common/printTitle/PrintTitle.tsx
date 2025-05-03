
import React from 'react';
import s from './PrintTitle.module.scss';
import classNames from 'classnames';


type PrintTitlePropsType = {
    text: string;
}



const PrintTitle: React.FC<PrintTitlePropsType> = ({ text }) => {
    const titleClass = text === 'Description' || text === 'Remarks'
        ? classNames(s.title, s.title__wide)
        : text === 'Qty.' || text === 'Rack' || text === 'EA/Packs' || text === 'Shelf' ? classNames(s.title, s.title__narrow) : classNames(s.title)

    return (
        <div className={titleClass}>
            <span>{text}</span>
        </div>
    )
}

export default PrintTitle;