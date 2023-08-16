import s from "./PrintLegs.module.scss";

import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import { AppDispatch, RootState } from "../../../../../store/store";
import Button from "../../../../../common/buttons/Button";
import Input from "../../../../../common/inputs/Input";
import { IAircraft, ILeg } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";
import { clearPrintLegs, getPrintLegs } from "../../../../../store/reducers/legReducer/legReducer";
import { getCurrentDate } from "../../../../../utils/utils";


interface IFilterValues {
    from: string;
    to: string;
}


const PrintLegs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const legs = useSelector((state: RootState) => state.leg.printLegs );
    const componentRef = useRef(null);
    const backHandler = () => {
        navigate(`/i-service/aircraft/${aircraft.msn}/legs`);
        dispatch(clearPrintLegs())
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div className={s.print} >
            <h1 className={s.print__header} >Report </h1>
            <Formik
                initialValues={{
                    from: '',
                    to: ''
                }}
                validate={values => {
                    interface IGetLegsErrorsDto {
                        from?: string;
                        to?: string;

                    }
                    const errors: IGetLegsErrorsDto = {};
                    if (!values.from) errors.from = 'Date is required';
                    if (!values.to) errors.to = 'Date is required';
                    return errors;
                }}
                onSubmit={async (
                    values: IFilterValues,
                    { setSubmitting }: FormikHelpers<IFilterValues>
                ) => {
                    dispatch(getPrintLegs({ aircraft: aircraft.msn, from: values.from, to: values.to }));
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (

                    <Form className={s.legs__filter}>
                        <div className={s.value__wrap}>
                            <label>From</label>
                            <Field type='date' id='from' name='from'
                                placeholder='' error={errors.from} as={Input} />
                        </div>
                        <div className={s.value__wrap}>
                            <label>To</label>
                            <Field type='date' id='to' name='to'
                                placeholder='' error={errors.from} as={Input} />
                        </div>
                        <Button text="Search" color="white" btnType="submit" />
                    </Form>
                )}
            </Formik>
            <ComponentToPrint legs={legs} aircraft={aircraft} ref={componentRef} />
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={backHandler} />
                <Button text="Print" btnType="button" color="green" handler={handlePrint} />
            </div>
        </div>
    )
}

type ComponentToPrintProps = {
    legs: ILeg[];
    aircraft: IAircraft;
}

const ComponentToPrint = React.forwardRef(({ legs, aircraft }: ComponentToPrintProps, ref: any) => {

    const reduceLegs = (legs: ILeg[]) => {
        const resArr = [];
        let tempArr = [];
        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            tempArr.push(leg);
            if (tempArr.length === 15) {
                resArr.push(tempArr);
                tempArr = [];
            }
            if (i === legs.length - 1) {
                resArr.push(tempArr);
            }
        }
        return resArr;
    }

    let [pages, setPages] = useState<any | null>(null)



    useEffect(() => {
        const pages = reduceLegs(legs);
        const pagesToPrint = pages.map((page, index) => {
            const legsComp = page.map((leg: ILeg) => {
                return (
                    <div key={leg._id} className={s.leg}>
                        <div className={s.leg__title__value}>{leg.depDate}</div>
                        <div className={s.leg__title__value}>{leg.flightNumber}</div>
                        <div className={s.leg__title__value}>{leg.from}</div>
                        <div className={s.leg__title__value}>{leg.to}</div>
                        <div className={s.leg__title__value}>{leg.blockOff}</div>
                        <div className={s.leg__title__value}>{leg.takeOff}</div>
                        <div className={s.leg__title__value}>{leg.landing}</div>
                        <div className={s.leg__title__value}>{leg.blockOn}</div>
                        <div className={s.leg__title__value}>{leg.flightTime}</div>
                        <div className={s.leg__title__value}>{leg.blockTime}</div>
                        <div className={s.leg__title__value}>{leg.fh}</div>
                        <div className={s.leg__title__value}>{leg.fc}</div>
                    </div>
                )
            })

            return (
                <>
                    < div className={s.page} >
                        <div className={s.aircraftInfo}>
                            <div className={s.aircraftInfo__wrap} >
                                <div className={s.aircraftInfo__block} >
                                    <span className={s.aircraftInfo__block__title}>Type:</span>
                                    <span className={s.aircraftInfo__block__value}>{aircraft.type}</span>
                                </div>

                                <div className={s.aircraftInfo__block}>
                                    <span className={s.aircraftInfo__block__title}>Reg:</span>
                                    <span className={s.aircraftInfo__block__value}>{aircraft.regNum}</span>
                                </div>
                            </div>
                            <div className={s.aircraftInfo__wrap} >
                                <div className={s.aircraftInfo__block}>
                                    <span className={s.aircraftInfo__block__title}>Date:</span>
                                    <span className={s.aircraftInfo__block__value}>{getCurrentDate()}</span>
                                </div>
                                <div className={s.aircraftInfo__block}>
                                    <span className={s.aircraftInfo__block__title}>MSN:</span>
                                    <span className={s.aircraftInfo__block__value}>{aircraft.msn}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={s.leg__title}>
                                <div className={s.leg__title__value}>Date</div>
                                <div className={s.leg__title__value}>Flight No</div>
                                <div className={s.leg__title__value}>From</div>
                                <div className={s.leg__title__value}>To</div>
                                <div className={s.leg__title__value}>Block Off</div>
                                <div className={s.leg__title__value}>Take Off</div>
                                <div className={s.leg__title__value}>Landing</div>
                                <div className={s.leg__title__value}>Block On</div>
                                <div className={s.leg__title__value}>Flight Time</div>
                                <div className={s.leg__title__value}>Block Time</div>
                                <div className={s.leg__title__value}>TSN</div>
                                <div className={s.leg__title__value}>CSN</div>
                            </div>
                            {legsComp}
                        </div>
                        <div className={s.page__footer} >
                            <span>Page</span>
                            <span>{index + 1}</span>
                            <span>of</span>
                            <span>{pages.length}</span>
                        </div>
                    </div >
                    {index !== pages.length-1 && <div className={s.break} />}
                </>
            )
        })
        setPages(pagesToPrint);
    }, [legs])

    return (
        <div className={s.printBlock} ref={ref}>
            {pages}
        </div>
    );

});

export default PrintLegs;