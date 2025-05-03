
import React, { useState } from 'react';
import s from './Title.module.scss';
import iconDown from '../../assets/img/png/sort_down.png';
import iconUp from '../../assets/img/png/sort_up.png';
import classNames from 'classnames';


type TitlePropsType = {
    text: string;
    sort: boolean;
    sortDirect: string;
    sortHandler: (sortDir: string) => void;
    isSortHandler: (isSort: any) => void;
}



const Title: React.FC<TitlePropsType> = ({ text, sort, sortDirect, sortHandler, isSortHandler }) => {

    const spanHandler = (e: any) => {
        const text = e.target.innerText;
        isSortHandler({ name: text, isSort: true });
    }

    const titleClass = text === 'Description' || text === 'Remarks'
        ? classNames(s.title, s.title__wide)
        : text === 'Qty.' || text === 'Rack' || text === 'EA/Packs' || text === 'Shelf' ? classNames(s.title, s.title__narrow) : classNames(s.title)

    return (
        <div className={titleClass}>
            <span onClick={spanHandler}>{text}</span>
            {sort && <button className={s.title__btn} onClick={sortDirect === 'az'
                ? () => sortHandler('za')
                : () => sortHandler('az')} >
                <img src={sortDirect === 'az' ? iconDown : iconUp} />
            </button>}
        </div>
    )
}

export default Title;