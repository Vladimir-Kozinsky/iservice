import { useTranslation } from "react-i18next";
import Feedback from "../Feedback/Feedback";
import s from "./Contacts.module.scss";
import React from "react";

type ContactsProps = {
    theme: String;
}

const Contacts: React.FC<ContactsProps> = ({ theme }) => {
    const { t, i18n } = useTranslation();
    return (
        <section id={s[`${theme}__contacts__wrap`]} className={s.contacts__wrap}>
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
    )
}

export default Contacts;