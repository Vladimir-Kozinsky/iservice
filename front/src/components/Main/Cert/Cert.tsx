import { useTranslation } from "react-i18next";
import s from "./Cert.module.scss";
import aocImg from "../../../assets/img/jpeg/aoc.jpg";
import manasImg from "../../../assets/img/jpeg/mro.jpg";
import manas1Img from "../../../assets/img/jpeg/mro_1.jpg";
import aqabaImg from "../../../assets/img/jpeg/mro1.jpg";
import aqaba1Img from "../../../assets/img/jpeg/mro1_1.jpg";
import { useState } from "react";
import classNames from "classnames";
import Certificate from "./Certificate/Certificate";

type CertProps = {
    theme: string;
}

const Cert: React.FC<CertProps> = ({ theme }) => {
    const { t, i18n } = useTranslation();


    type Certificate = {
        id: string,
        title: string,
        img: string,
        img1?: string
    }

    const certificates: Certificate[] = [
        { id: 'aoc', title: t("aoc_cert"), img: aocImg },
        { id: 'mro-first', title: t("mro_cert"), img: manasImg, img1: manas1Img },
        { id: 'mro-second', title: t("mro1_cert"), img: aqabaImg, img1: aqaba1Img },
    ]



    return (
        <div id={s[`${theme}__cert__wrap`]} className={s.cert__wrap}>
            <h3 className={s.section__title} >{t("cert_title")}</h3>
            <div className={s.cert} >
                {certificates.map(cert => {
                    return (
                        <Certificate cert={cert} />
                    )
                }
                )}
            </div>
        </div>
    )
}


export default Cert;