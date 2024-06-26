import s from './Slider.module.scss'
import slider1 from '../../../assets/img/jpeg/slider-img1.jpeg'
import slider5 from '../../../assets/img/jpeg/slider-img5.jpeg'
import slider2 from '../../../assets/img/jpeg/slider-img2.jpeg'
import slider3 from '../../../assets/img/jpeg/slider-img3.jpeg'
import slider4 from '../../../assets/img/jpeg/slider-img4.jpeg'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

const slides = [
    slider1,
    slider2,
    slider3,
    slider4,
    slider5,
]


const Slider = () => {
    const SLIDE_SIZE = window.screen.width > 1200 ? 770
        : window.screen.width > 768 ? 700
            : window.screen.width > 480 ? 460 : 300
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => {
        if (currentSlide !== slides.length - 1) setCurrentSlide(currentSlide + 1)
    }
    const prevSlide = () => {
        if (currentSlide !== 0) setCurrentSlide(currentSlide - 1)
    }

    return (
        <div className={s.slider} >
            <div className={s.carousel} >
                <div className={s.carousel__btns}>
                    <button className={classNames(s.carousel__btn__left, currentSlide === 0 && s['disable'])} onClick={prevSlide} >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                        </svg>
                    </button>
                    <button className={classNames(s.carousel__btn__right, currentSlide === slides.length - 1 && s['disable'])} onClick={nextSlide} >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                        </svg>
                    </button>
                </div>

                <div className={s.carousel__container} >
                    {slides.map((item: string, index: number) => <div key={index} className={s.carousel__container__item}
                        style={{ transform: `translateX(${-SLIDE_SIZE * currentSlide}px)` }}>
                        <img src={item} alt="" />
                    </div>)}
                </div>

                <div className={s.carousel__dotes} >
                    {slides.map((item: string, index: number) =>
                        <button
                            className={classNames(s.carousel__dotes__item, index === currentSlide ? s.active : null)}
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                        ></button>)}
                </div>
            </div>
        </div>
    )
}

export default Slider