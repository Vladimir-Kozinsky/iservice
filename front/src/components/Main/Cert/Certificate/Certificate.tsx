import { useState } from "react";
import s from "./Certificate.module.scss";
import classNames from "classnames";
import iconRotate from "../../../../assets/img/png/icon-rotate.png";

type CertificateProps = {
    cert: {
        id: string,
        title: string,
        img: string,
        img1?: string
    };
}

const Certificate: React.FC<CertificateProps> = ({ cert }) => {
    const [active, setActive] = useState('');
    const [page, setPage] = useState('');

    const Rotate = () => {
        setActive('active')
        setTimeout(() => {
            setActive('')
        }, 1000);
        if (page == 'first' || page == '') {
            setPage('second');
        } else {
            setPage('first')
        }
    }

    return (
        <div key={cert.id} className={s.cert__item}>
            <h4 className={s.cert__title}>{cert.title}</h4>
            <div className={classNames(s.cert__item__wrap, s[active])}>
                {cert.img1 && <button onClick={() => Rotate()} className={s.cert__item__btn}><img src={iconRotate} alt="rotate" /></button>}
                <img className={classNames(s.cert__item__img, s[page])} src={cert.img} alt="cert_img" />
                {cert.img1 && <img className={classNames(s.cert__item__img, s['second__page'])} src={cert.img1} alt="cert_img" />}
            </div>
        </div>
    )
}

export default Certificate;