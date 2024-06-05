import { useTranslation } from "react-i18next";
import s from "./About.module.scss";
import React, { useEffect, useState } from "react";
import Slider from './../Slider/Slider';
import classNames from 'classnames';
import News from "../News/News";

type AboutProps = {
    theme: String;
}

const About: React.FC<AboutProps> = ({ theme }) => {
    const { t, i18n } = useTranslation();
    const [isAbout, setIsAbout] = useState<boolean>(false);
    const [active, setActive] = useState('');
    useEffect(() => {
        setActive('active')
    }, [])
    return (
        <>
            <section id={s[`${theme}__about__wrap`]} className={classNames(s.about__wrap, isAbout && s['active'])}>
                <div className={classNames(s.moove__block, s[active])}>
                    <div className={s.about} >
                        <h3 className={classNames(s.about__title, isAbout && s[active])}>{t("about_title")}</h3>
                        <p className={s.about__par}>
                            {t("about_par1")}
                        </p>
                        {isAbout && <>
                            <p className={s.about__par}>
                                {t("about_par2")}
                            </p>
                            <p className={s.about__par}>
                                {t("about_par3")}
                            </p>
                            <p className={classNames(s.about__par, s.about__par__last)}>
                                {t("about_par4")}
                            </p>
                            <div className={s.hide__btn__wrap}>
                                <button className={s.hide__btn} onClick={() => setIsAbout(false)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </>}
                        {!isAbout && <div className={s.about__btn} onClick={() => setIsAbout(true)} >
                            <span className={s.about__btn__link}>{t("about_btn")}</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                            </svg>
                        </div>}
                    </div>
                    <Slider />
                </div>
            </section>
            <News theme={theme} />
        </>

    )
}

export default About;