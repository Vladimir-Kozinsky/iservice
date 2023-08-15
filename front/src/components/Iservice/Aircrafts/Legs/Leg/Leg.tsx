import { ILeg, ILegEngine } from "../../../../../types/types";
import { useEffect, useState } from "react";
import s from "./Leg.module.scss";
import classNames from "classnames";

type LegProps = {
    leg: ILeg;
    setLegDate: (id: string) => void;
    state: string;
}

const Leg: React.FC<LegProps> = ({ leg, setLegDate, state }) => {
    const [active, setActive] = useState<string>(state);
    const [legsEditMode, setLegsEditMode] = useState<boolean>(false);

    const legHandler = async (state: string) => {
        const setTimeoutFunc = (state: boolean) => {
            if (!state) return setLegsEditMode(state);
            setTimeout(() => {
                setLegsEditMode(state);
            }, 100);
        }

        if (state === 'open') {
            setActive('open')
            setTimeoutFunc(true);
        } else {
            setActive('close')
            setTimeoutFunc(false);
        }
    }

    useEffect(() => {
        if (state.length) legHandler(state);
    }, [state])

    return (
        <div key={leg._id} className={classNames(s.leg, s[active])}>
            <div className={s.leg__data} >
                <div className={s.leg__data__value}>{leg.depDate}</div>
                <div className={s.leg__data__value}>{leg.flightNumber}</div>
                <div className={s.leg__data__value}>{leg.from}</div>
                <div className={s.leg__data__value}>{leg.to}</div>
                <div className={s.leg__data__value}>{leg.blockOff}</div>
                <div className={s.leg__data__value}>{leg.blockOn}</div>
                <div className={s.leg__data__value}>{leg.takeOff}</div>
                <div className={s.leg__data__value}>{leg.landing}</div>
                <div className={s.leg__data__value}>{leg.flightTime}</div>
                <div className={s.leg__data__value}>{leg.blockTime}</div>
                <div className={s.leg__data__value}>{leg.fh}</div>
                <div className={s.leg__data__value}>{leg.fc}</div>
                <button className={s.leg__btn} onClick={() => active === 'close' || active === '' ? legHandler('open') : legHandler('close')} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="30px" viewBox="0 -4.5 20 20" version="1.1">
                        <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -6684.000000)" >
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583" id="arrow_down-[#338]">
                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <div className={s.leg__engines} >
                {leg.engines.map((engine: ILegEngine,) => (
                    <div key={engine.msn} className={s.leg__block}>
                        <div className={s.block__item}>
                            <div className={s.block__item__title} >
                                <span >ENG:</span>
                            </div>
                            <div className={s.block__item__value}>
                                <span >{engine.msn}</span>
                            </div>
                        </div>

                        <div className={s.block__item}>
                            <div className={s.block__item__title} >
                                <span >TSN:</span>
                            </div>
                            <div className={s.block__item__value}>
                                <span >{engine.engineTsn}</span>
                            </div>
                        </div>

                        <div className={s.block__item}>
                            <div className={s.block__item__title} >
                                <span >CSN:</span>
                            </div>
                            <div className={s.block__item__value}>
                                <span >{engine.engineCsn}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>





            {legsEditMode
                && <div className={s.edit__btns} >
                    {/* <button className={s.edit__btns__edit} onClick={() => console.log('edit leg')}></button> */}
                    <button className={s.edit__btns__del} onClick={() => setLegDate(leg._id)} ></button>
                </div>}
        </div>

    )
}

export default Leg;