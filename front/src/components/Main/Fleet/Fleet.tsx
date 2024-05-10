import s from './Fleet.module.scss';
import { useTranslation } from 'react-i18next';
import plane_sheme4 from '../../../assets/img/png/plane_il.png'
import plane_sheme1 from '../../../assets/img/png/plane2_boeing.png'
import plane_demen from '../../../assets/img/jpeg/B737_demensions.jpg'
import plane_demen1 from '../../../assets/img/jpeg/plane_demensions.jpg'
import React from 'react';

type FleetProps = {
    theme: String;
}

const Fleet: React.FC<FleetProps> = ({ theme }) => {
    const { t, i18n } = useTranslation();
    return (
        <section id={s[`${theme}__fleet__wrap`]} className={s.fleet__wrap}>
            <h3 className={s.section__title} >{t("fleet_title")}</h3>
            <div className={s.fleet} >
                <div className={s.fleet__item} >
                    <h4 className={s.fleet_title}>{t("plane_model1")}</h4>
                    <div className={s.fleet__img} >
                        <img src={plane_sheme1} alt="" />
                    </div>
                    <div className={s.fleet__item__info} >
                        <div className={s.params}>
                            <div className={s.params__disc}>
                                <span>{t("MTW")}</span>
                                <span>{t("max_payload")}</span>
                                <span>{t("max_volume")}</span>
                            </div>
                            <div className={s.params__value} >
                                <span>61 234</span>
                                <span>17 000</span>
                                <span>180</span>
                            </div>
                        </div>
                    </div>
                </div>
                <img className={s.fleet__dimensions__img} src={plane_demen} alt="" />
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
                <img className={s.fleet__dimensions__img} src={plane_demen1} alt="" />
            </div>

        </section>
    )
}

export default Fleet;