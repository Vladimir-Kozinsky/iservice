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
import { Route, Routes } from 'react-router-dom';
import Fleet from './Fleet/Fleet';
import Contacts from './Contacts/Contacts';
import About from './About/About';
import Cert from './Cert/Cert';

interface IThemeContext {
    theme: string;
    toggleTheme: () => void;
}


export const ThemeContext = createContext<IThemeContext | null>(null);

const Main: React.FC = () => {
    const [active, setActive] = useState('');
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
                            <Routes>
                                <Route path="/" element={<About theme={theme} />} />
                                <Route path="fleet" element={<Fleet theme={theme} />} />
                                <Route path="cert" element={<Cert theme={theme} />} />
                                <Route path="contacts" element={<Contacts theme={theme} />} />
                            </Routes>


                        </div>
                    </main >
                    <Footer theme={theme} />
                </div >
            </ThemeContext.Provider>
        </Suspense>
    )
}

export default Main;