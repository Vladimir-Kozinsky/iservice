import { useNavigate } from "react-router-dom";
import s from "./Store.module.scss";
import React, { MouseEventHandler, useEffect, useState } from "react";
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
import EditUnitForm from "./EditUnitForm/EditUnitForm";
import withSuccessMessage from "../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../HOC/wirhErrorMessage";
import { compose } from "@reduxjs/toolkit";
import Pagenator from "../../../common/Pagenator/Pagenator";
import { cutText } from "../../../utils/utils";
import Select, { ActionMeta, MultiValue } from 'react-select';



const Store: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const unitsArr = useSelector((state: RootState) => state.store.units);
    const [isSort, setSort] = useState({ name: '', isSort: false });
    const [sortDir, setSortDir] = useState('az');
    const [newForm, setNewForm] = useState(false);
    const [editUnit, setEditUnit] = useState<null | IUnit>(null);
    const currentPage = useSelector((state: RootState) => state.store.currentPage);
    const totalPages = useSelector((state: RootState) => state.store.totalPages);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const [search, setSearch] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>(['Sharjah', 'Manas', 'Aqaba']);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['Rotable', 'Consumable']);

    interface IOption {
        value: string | null;
        label: string | null;
    }

    const titlesArr = [
        'ATA', 'P/N', 'S/N', 'Part Type', 'Description', 'GRN', 'Quantity', 'EA/Packs',
        'Location', 'Condition', 'Life Limit', 'Shelf Life', 'Certificate', 'Remarks'
    ]

    const locationOptions = [
        { value: 'All', label: 'All Locations' },
        { value: 'Sharjah', label: 'Sharjah' },
        { value: 'Manas', label: 'Manas' },
        { value: 'Aqaba', label: 'Aqaba' },
    ]

    const typeOptions = [
        { value: 'All', label: 'All' },
        { value: 'Rotable', label: 'Rotable' },
        { value: 'Consumable', label: 'Consumable' },
    ]

    const titles = () => titlesArr.map((title) => <Title text={title}
        sort={isSort.name === title ? isSort.isSort : false}
        sortDirect={sortDir}
        sortHandler={setSortDir}
        isSortHandler={setSort} />
    )

    const unitClickHandler = (unit: IUnit) => {
        setEditUnit(unit)
    }

    const changePage = async (page: number) => {
        setIsLoader(true);
        await dispatch(getUnits({ page: page, searchText: search, locationFilter: selectedLocations, typeFilter: selectedTypes, unitsAtPage: 20 }));
        setIsLoader(false);
    }

    const inputOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        await dispatch(getUnits({ page: 1, unitsAtPage: 20, searchText: value, locationFilter: selectedLocations, typeFilter: selectedTypes }));
    }

    const findHandler = async () => {
        await dispatch(getUnits({ page: 1, unitsAtPage: 20, searchText: search, locationFilter: selectedLocations, typeFilter: selectedTypes }));
    }

    const onChangeLocation = async (newValue: any, actionMeta: ActionMeta<IOption>) => {
        let filterArr = newValue.map((item: any) => item.value);
        filterArr.forEach((element: string) => {
            if (element === 'All') {
                filterArr = ['Sharjah', 'Manas', 'Aqaba']
            }
        });
        setSelectedLocations(filterArr);
        setIsLoader(true);
        await dispatch(getUnits({ page: 1, unitsAtPage: 20, searchText: search, locationFilter: filterArr, typeFilter: selectedTypes }));
        setIsLoader(false);
    }
    const onChangeType = async (newValue: any, actionMeta: ActionMeta<IOption>) => {
        let filterArr = newValue.map((item: any) => item.value);
        filterArr.forEach((element: string) => {
            if (element === 'All') {
                filterArr = ['Rotable', 'Consumable']
            }
        });
        setSelectedTypes(filterArr);
        setIsLoader(true);
        await dispatch(getUnits({ page: 1, unitsAtPage: 20, searchText: search, locationFilter: selectedLocations,  typeFilter: filterArr }));
        setIsLoader(false);
    }

    const customStyles = {
        option: (provided: any) => ({
            ...provided,
            height: '50px',
        }),
        control: (provided: any) => ({
            ...provided,
            borderRadius: '24px',
            minWidth: '250px',
            height: '40px',
        }),
    }



    const units = () => unitsArr.map((unit: IUnit) => {
        return (
            <div className={s.unit} onClick={() => unitClickHandler(unit)}>
                <span className={s.unit__title} >{unit.ata}</span>
                <span className={s.unit__title} >{unit.pn}</span>
                <span className={s.unit__title}>{unit.sn}</span>
                <span className={s.unit__title} >{unit.type}</span>
                <span className={classNames(s.unit__title, s.title__wide)}>{unit.desc}</span>
                <a className={s.unit__title}>{cutText(12, unit.grn)}</a>
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
        dispatch(getUnits({ page: 1, unitsAtPage: 20, locationFilter: selectedLocations, typeFilter: selectedTypes }));
    }, [])

    return (
        <div className={s.store} >
            {newForm && <NewUnitForm isNewForm={setNewForm} />}
            {editUnit && <EditUnitForm editUnit={editUnit} isEditUnit={setEditUnit} />}
            <h1 className={s.store__header}>Store</h1>

            <div className={s.search}>
                <img className={s.search__icon} onClick={findHandler} src={magnifIcon} alt="maginf__icon" />
                <Input onChange={inputOnChange} className={s.search__input} placeholder="Find" />
                <div className={s.filter}>
                    {/* <span>Filter</span> */}
                    <Select
                        onChange={onChangeLocation}
                        styles={customStyles}
                        defaultValue={[locationOptions[0]]}
                        isMulti
                        name="filters"
                        options={locationOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                    <Select
                        onChange={onChangeType}
                        styles={customStyles}
                        defaultValue={[typeOptions[0]]}
                        isMulti
                        name="filters"
                        options={typeOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

            </div>
            <div className={s.filter}>

            </div>
            <Pagenator totalPages={totalPages ? totalPages : 1} currentPage={currentPage ? currentPage : 1} changePage={changePage} />
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

const EnhancedComponent = withSuccessMessage(Store);

export default compose(withErrorMessage)(EnhancedComponent);
