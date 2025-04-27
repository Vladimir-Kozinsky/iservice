import { useNavigate } from "react-router-dom";
import s from "./Store.module.scss";
import React, { useEffect, useState } from "react";
import Button from "../../../common/buttons/Button";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../common/title/Title";
import Input from "../../../common/inputs/Input";
import magnifIcon from "../../../assets/img/png/magnif__icon.png";
import { getUnits } from "../../../store/reducers/storeReducer/storeReducer";
import { IUnit } from "../../../types/types";
import classNames from "classnames";
import NewUnitForm from "./NewUnitForm/NewUnitForm";



const Store: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const unitsArr = useSelector((state: RootState) => state.store.units);
    const [isSort, setSort] = useState({ name: '', isSort: false });
    const [sortDir, setSortDir] = useState('az');
    const [newForm, setNewForm] = useState(false);

    const titlesArr = [
        'ATA', 'P/N', 'S/N', 'Part Type', 'Description', 'GRN', 'Quantity', 'EA/Packs',
        'Location', 'Condition', 'Life Limit', 'Shelf Life', 'Certificate', 'Remarks'
    ]

    const titles = () => titlesArr.map((title) => <Title text={title}
        sort={isSort.name === title ? isSort.isSort : false}
        sortDirect={sortDir}
        sortHandler={setSortDir}
        isSortHandler={setSort} />
    )

    const units = () => unitsArr.map((unit: IUnit) => {
        return (
            <div className={s.unit}>
                <span className={s.unit__title} >{unit.ata}</span>
                <span className={s.unit__title} >{unit.pn}</span>
                <span className={s.unit__title}>{unit.sn}</span>
                <span className={s.unit__title} >{unit.type}</span>
                <span className={classNames(s.unit__title, s.title__wide)}>{unit.desc}</span>
                <span className={s.unit__title}>{unit.grn}</span>
                <span className={s.unit__title}>{unit.quantity}</span>
                <span className={s.unit__title}>{unit.eapack}</span>
                <span className={s.unit__title}>{unit.location}</span>
                <span className={s.unit__title}>{unit.condition}</span>
                <span className={s.unit__title}>{unit.lifelimit}</span>
                <span className={s.unit__title}>{unit.shelflife}</span>
                <span className={s.unit__title}>{unit.certificate}</span>
                <span className={classNames(s.unit__title, s.title__wide)}>{unit.remarks}</span>
            </div>
        )
    }
    )

    useEffect(() => {
        dispatch(getUnits());
    }, [])

    return (
        <div className={s.store} >
            {newForm && <NewUnitForm isNewForm={setNewForm} />}
            <h1 className={s.store__header}>Store</h1>
            <div className={s.search}>
                <img className={s.search__icon} src={magnifIcon} alt="maginf__icon" />
                <Input className={s.search__input} placeholder="Find" />
            </div>
            <div className={s.unit}>
                {titles()}
            </div>
            {units()}
            <div className={s.store__buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => navigate('/i-service')} />
                <Button text="Add" btnType="button" color="green" handler={() => setNewForm(true)} />
            </div>
        </div>
    )
}

export default Store;