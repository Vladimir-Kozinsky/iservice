import { useDispatch, useSelector } from 'react-redux';
import s from './Legs.module.scss';
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from '../../../../store/store';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Input from '../../../../common/inputs/Input';
import Button from '../../../../common/buttons/Button';
import { getLegs } from '../../../../store/reducers/legReducer/legReducer';
import { ILeg, ILegEngine } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';
import Pagenator from '../../../../common/Pagenator/Pagenator';
import { Transition } from 'react-transition-group';
import Loader from '../../../../common/Loader/Loader';

interface IFilterValues {
    from: string;
    to: string;
}

const Legs: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [addLegForm, setAddLegForm] = useState(false);
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const legs = useSelector((state: RootState) => state.leg.legs);
    const totalPages = useSelector((state: RootState) => state.leg.totalPages);
    const currentPage = useSelector((state: RootState) => state.leg.currentPage);
    const [searchParam, setSearchParam] = useState({ from: '', to: '' });
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const changePage = async (page: number) => {
        setIsLoader(true);
        await dispatch(getLegs({ aircraft: aircraft.msn, from: searchParam.from, to: searchParam.to, page: page }));
        setIsLoader(false);
    }

    const legsComp = legs.map((leg: ILeg) => {
        return (
            <div key={leg._id} className={s.leg}>
                <div className={s.leg__block}>
                    <div className={s.leg__title__value}>{leg.depDate}</div>
                    <div className={s.leg__title__value}>{leg.flightNumber}</div>
                </div>

                <div className={s.leg__block}>
                    <div className={s.leg__title__value}>{leg.from}</div>
                    <div className={s.leg__title__value}>{leg.to}</div>
                </div>


                <div className={s.leg__block}>
                    <div className={s.leg__title__value}>{leg.blockOff}</div>
                    <div className={s.leg__title__value}>{leg.blockOn}</div>
                </div>

                <div className={s.leg__block}>
                    <div className={s.leg__title__value}>{leg.takeOff}</div>
                    <div className={s.leg__title__value}>{leg.landing}</div>
                </div>

                <div className={s.leg__block}>
                    <div className={s.leg__title__value}>{leg.flightTime}</div>
                    <div className={s.leg__title__value}>{leg.blockTime}</div>
                </div>
                <div className={s.leg__block}>
                    <div className={s.leg__title__value}>{leg.fh}</div>
                    <div className={s.leg__title__value}>{leg.fc}</div>
                </div>
                {leg.engines.map((engine: ILegEngine,) => (
                    <div key={engine.msn} className={s.leg__block}>
                        <div className={s.leg__title__value}>{engine.msn}</div>
                        <div className={s.leg__title__value}>{engine.engineTsn}</div>
                        <div className={s.leg__title__value}>{engine.engineCsn}</div>
                    </div>
                ))}

                {/* {editLegForm && <EditLegForm setAddLegForm={setEditLegForm} msn={aircraft.msn} fh={aircraft.fh} fc={aircraft.fc} leg={leg} />} */}







                {/* {legsEditMode
                    && <div className={s.edit__btns} >
                        <button className={s.edit__btns__edit} onClick={() => setEditLegForm(true)}></button>
                        <button className={s.edit__btns__del} onClick={() => setDelMess(true)} ></button>
                    </div>} */}
            </div>
        )
    })

    useEffect(() => {
        //  dispatch(getLegs(aircraft.msn, from, to))
    }, [])

    return (
        <div className={s.legs} >
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <div className={s.aircraftInfo} >
                <div className={s.aircraftInfo__wrap} >
                    <div className={s.aircraftInfo__block} >
                        <span className={s.aircraftInfo__block__title}>Type:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.type}</span>
                    </div>
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>MSN:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.msn}</span>
                    </div>
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>Reg:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.regNum}</span>
                    </div>
                </div>
                <div className={s.aircraftInfo__wrap} >
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>FH:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.fh}</span>
                    </div>
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>FC:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.fc}</span>
                    </div>
                </div>
            </div>
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
                    setSearchParam({ from: values.from, to: values.to });
                    setIsLoader(true);
                    await dispatch(getLegs({ aircraft: aircraft.msn, from: values.from, to: values.to, page: 1 }));
                    setIsLoader(false);
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

            <div className={s.legs}>
                {totalPages ? <Pagenator totalPages={totalPages} currentPage={currentPage ? currentPage : 1} changePage={changePage} /> : null}
                <div className={s.leg__title}>
                    <div className={s.leg__block}>
                        <div className={s.leg__title__value}>Date</div>
                        <div className={s.leg__title__value}>Flight No</div>
                    </div>
                    <div className={s.leg__block}>
                        <div className={s.leg__title__value}>From</div>
                        <div className={s.leg__title__value}>To</div>
                    </div>
                    <div className={s.leg__block}>
                        <div className={s.leg__title__value}>Block Off</div>
                        <div className={s.leg__title__value}>Block On</div>
                    </div>
                    <div className={s.leg__block}>
                        <div className={s.leg__title__value}>Take Off</div>
                        <div className={s.leg__title__value}>Landing</div>
                    </div>
                    <div className={s.leg__block}>
                        <div className={s.leg__title__value}>Flight Time</div>
                        <div className={s.leg__title__value}>Block Time</div>
                    </div>
                    <div className={s.leg__block}>
                        <div className={s.leg__title__value}>Aircraft</div>
                        <div className={s.leg__title__value}>FH</div>
                        <div className={s.leg__title__value}>FC</div>
                    </div>
                    {legs.length && legs[0].engines.map((engine: ILegEngine,) => (
                        <div key={engine.msn} className={s.leg__block}>
                            <div className={s.leg__title__value}>Engine</div>
                            <div className={s.leg__title__value}>TSN</div>
                            <div className={s.leg__title__value}>CSN</div>
                        </div>
                    ))}


                    <button className={s.edit__btn} onClick={() => console.log('edit hendler')}></button>
                </div>
                {legsComp}
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate(`/i-service/aircraft/${aircraft.msn}`)} />
                <Button text="Add" btnType="button" color="green" handler={() => navigate(`create`)} />
            </div>
        </div>
    )
}

export default Legs;