import { useDispatch, useSelector } from 'react-redux';
import s from './Legs.module.scss';
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from '../../../../store/store';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Input from '../../../../common/inputs/Input';
import Button from '../../../../common/buttons/Button';
import { getLegs, getlastTenLegs, deleteLeg } from '../../../../store/reducers/legReducer/legReducer';
import { ILeg } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';
import Pagenator from '../../../../common/Pagenator/Pagenator';
import { Transition } from 'react-transition-group';
import Loader from '../../../../common/Loader/Loader';
import DeleteMessage from '../../../../common/messages/DeleteMessage/DeleteMessage';
import Leg from './Leg/Leg';

interface IFilterValues {
    from: string;
    to: string;
}

const Legs: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [delMess, setDelMess] = useState(false);
    const aircraft = useSelector((state: RootState) => state.aircraft.choosedAircraft);
    const legs = useSelector((state: RootState) => state.leg.legs);
    const totalPages = useSelector((state: RootState) => state.leg.totalPages);
    const currentPage = useSelector((state: RootState) => state.leg.currentPage);
    const [searchParam, setSearchParam] = useState({ from: '', to: '' });
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const [choosedLeg, setChoosedLeg] = useState<string>('');
    const [legState, setLegState] = useState<string>('');

    const changePage = async (page: number) => {
        setIsLoader(true);
        await dispatch(getLegs({ aircraft: aircraft.msn, from: searchParam.from, to: searchParam.to, page: page }));
        setIsLoader(false);
    }

    const setLegDate = (legId: string) => {
        setChoosedLeg(legId);
        setDelMess(true);
    }
    const deleteLegHandler = async () => {
        setIsLoader(true);
        await dispatch(deleteLeg(choosedLeg));
        setIsLoader(false);
    }

    useEffect(() => {
        (async () => {
            setIsLoader(true);
            await dispatch(getlastTenLegs(aircraft.msn))
            setIsLoader(false);
        })()
    }, [])

    return (
        <div className={s.legs} >
             <h1 className={s.legs__header} >Legs</h1>
            {delMess && <DeleteMessage handleBack={() => setDelMess(false)}
                handleSubmit={deleteLegHandler}
                header='Would you like to delete this leg?'
                text='The leg will be permanently deleted' />}
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
                        <span className={s.aircraftInfo__block__title}>TSN:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.fh}</span>
                    </div>
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>CSN:</span>
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
                    <div className={s.leg__title__value}>Date</div>
                    <div className={s.leg__title__value}>Flight No</div>
                    <div className={s.leg__title__value}>From</div>
                    <div className={s.leg__title__value}>To</div>
                    <div className={s.leg__title__value}>Block Off</div>
                    <div className={s.leg__title__value}>Block On</div>
                    <div className={s.leg__title__value}>Take Off</div>
                    <div className={s.leg__title__value}>Landing</div>
                    <div className={s.leg__title__value}>Flight Time</div>
                    <div className={s.leg__title__value}>Block Time</div>
                    <div className={s.leg__title__value}>TSN</div>
                    <div className={s.leg__title__value}>CSN</div>
                    <button className={s.leg__btn} onClick={() => legState === "open" ? setLegState('close') : setLegState('open')} >
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
                {legs.map((leg: ILeg) => {
                    return (
                        <Leg key={leg._id} state={legState} leg={leg} setLegDate={setLegDate} />
                    )
                })}
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate(`/i-service/aircraft/${aircraft.msn}`)} />
                <Button text="Add" btnType="button" color="green" handler={() => navigate(`create`)} />
                <Button text="Print" btnType="button" color="green" handler={() => navigate(`print`)} />
            </div>
        </div>
    )
}

export default Legs;