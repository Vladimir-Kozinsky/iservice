import { useTranslation } from "react-i18next";
import s from "./News.module.scss";
import post1 from "../../../assets/img/jpeg/slider-img2.jpeg";
import post2 from "../../../assets/img/jpeg/cfm56.jpg";
import post4 from "../../../assets/img/jpeg/ex76010.jpg";
import post3 from "../../../assets/img/jpeg/ex76015.jpg";

type NewsProps = {
    theme: String;
}



const News: React.FC<NewsProps> = ({ theme }) => {
    const { t, i18n } = useTranslation();

    const newsArr = [
        { id: 1, date: "19.04.2024", text: t("news_first"), img: post1 },
        { id: 2, date: "19.04.2024", text: t("news_second"), img: post2 },
        { id: 3, date: "25.03.2024", text: t("news_third"), img: post3 },
        { id: 4, date: "26.02.2024", text: t("news_forth"), img: post4},
    ]

    return (
        <section id={s[`${theme}__news__wrap`]} className={s.news__wrap} >
            <h3 className={s.section__title} >{t("news_title")}</h3>
            <div className={s.news} >
                {newsArr.map(n => {
                    console.log(n.text)
                    return (
                        <div className={s.news__item}>
                            <div className={s.news__item__img}>
                                <img src={n.img} alt="" />
                            </div>
                            <div className={s.post}>
                                <span className={s.post_date}>
                                    {n.date}
                                </span>
                                <p>
                                    {n.text}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section >
    )
}

export default News;

