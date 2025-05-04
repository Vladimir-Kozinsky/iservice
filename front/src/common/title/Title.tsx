
import React, { useState } from 'react';
import s from './Title.module.scss';
import iconDown from '../../assets/img/png/sort_down.png';
import iconUp from '../../assets/img/png/sort_up.png';
import classNames from 'classnames';


type TitlePropsType = {
    text: {
        title: string,
        value: string,
    };
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


    return (
        <div className={classNames(s.title, s[`title__${text.title}`])}>
            <span onClick={spanHandler}>{text.value}</span>
            {sort && <button className={s.title__btn} onClick={sortDirect === 'az'
                ? () => sortHandler('za')
                : () => sortHandler('az')} >
                <img src={sortDirect === 'az' ? iconDown : iconUp} />
            </button>}
        </div>
    )
}

export default Title;