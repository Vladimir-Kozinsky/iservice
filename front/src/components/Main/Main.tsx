import React, { createContext, Suspense, useEffect, useState } from 'react'
import HeaderMain from './HeaderMain/HeaderMain';
import s from './Main.module.scss'
import Slider from './Slider/Slider';
import plane_sheme4 from '../../assets/img/png/plane_il.png'
import Feedback from './Feedback/Feedback';
import plane_demen from './../../assets/img/jpeg/plane_demensions.jpg'
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';

interface IThemeContext {
    theme: string;
    toggleTheme: () => void;
}


export const ThemeContext = createContext<IThemeContext | null>(null);

const Main: React.FC = () => {
    const [active, setActive] = useState('');
    const [isAbout, setIsAbout] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };
    useEffect(() => {
        setActive('active')
    }, [])
    return (
        <Suspense fallback="loading">
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <div className={s.main}  >
                    <HeaderMain />
                    <main className={s.main__content} id={s[`${theme}__main`]} >
                        <div className={s.main__content__back}></div>
                        <div className={s.main__content__back2}></div>
                        <div className={s.content__container}>
                            <section className={classNames(s.about__wrap, isAbout && s['active'])}>
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
                            <section id='fleet' className={s.fleet__wrap}>
                                <h3 className={s.section__title} >{t("fleet_title")}</h3>
                                <div className={s.fleet} >
                                    <div className={s.fleet__item} >
                                        <h4 className={s.fleet_title}>{t("plane_mogel1")}</h4>
                                        <div className={s.fleet__img} >
                                            <img src={plane_sheme4} alt="" />
                                        </div>
                                        <div className={s.fleet__item__info} >
                                            <div className={s.params}>
                                                <div className={s.params__disc}>
                                                    <span>{t("MTW")}</span>
                                                    <span>{t("max_payload")}</span>
                                                    <span>{t("max_volume")}</span>
                                                </div>
                                                <div className={s.params__value} >
                                                    <span>175 000</span>
                                                    <span>43 400</span>
                                                    <span>180</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={s.fleet__item} >
                                        <h4 className={s.fleet_title}>{t("plane_model2")}</h4>
                                        <div className={s.fleet__img} >
                                            <img src={plane_sheme4} alt="" />
                                        </div>
                                        <div className={s.fleet__item__info} >
                                            <div className={s.params}>
                                                <div className={s.params__disc}>
                                                    <span>{t("MTW")}</span>
                                                    <span>{t("max_payload")}</span>
                                                    <span>{t("max_volume")}</span>
                                                </div>
                                                <div className={s.params__value} >
                                                    <span>190 000</span>
                                                    <span>50 000</span>
                                                    <span>180</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <img className={s.fleet__dimensions__img} src={plane_demen} alt="" />
                                </div>

                            </section>
                            <section className={s.contacts__wrap} id="contacts">
                                <h3 className={s.section__title} >{t("contacts_title")}</h3>
                                <div className={s.contacts} >
                                    <div className={s.contacts__address}>
                                        <h4 className={s.contacts__address__title}>{t("company_name")}</h4>
                                        <span className={s.contacts__address__text} >{t("addres1")}</span><br />
                                        <span className={s.contacts__address__text} >{t("addres2")}</span><br />
                                        <span className={s.contacts__address__text} >{t("addres3")}</span>
                                        <iframe className={s.contacts__address__map}
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.7158185199273!2d74.60902077150811!3d42.85773337372006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb633eb4a865f%3A0xda48af2b2a2e4b59!2sVefa%20Center!5e0!3m2!1sen!2sae!4v1672640878930!5m2!1sen!2sae"
                                            height="350" loading="lazy" >
                                        </iframe>
                                    </div>
                                    <div className={s.contacts__feedBack}>
                                        <Feedback />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main >
                    <Footer theme={theme} />
                </div >
            </ThemeContext.Provider>
        </Suspense>
    )
}

export default Main;