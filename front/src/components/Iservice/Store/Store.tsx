import { useNavigate } from "react-router-dom";
import s from "./Store.module.scss";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../common/buttons/Button";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../common/title/Title";
import Input from "../../../common/inputs/Input";
import magnifIcon from "../../../assets/img/png/magnif__icon.png";
import { getUnits } from "../../../store/reducers/storeReducer/storeReducer";
import { IUnit } from "../../../types/types";
import NewUnitForm from "./NewUnitForm/NewUnitForm";
import EditUnitForm from "./EditUnitForm/EditUnitForm";
import withSuccessMessage from "../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../HOC/wirhErrorMessage";
import { compose } from "@reduxjs/toolkit";
import Pagenator from "../../../common/Pagenator/Pagenator";
import Select, { ActionMeta, MultiValue } from 'react-select';
import Unit from "./Unit/Unit";
import UsageUnitForm from "./UsageUnitForm/UsageUnitForm";
import UnitHistory from "./UnitHistory/UnitHistory";
import PrintUnitForm from "./PrintUnitForm/PrintUnitForm";



const Store: React.FC = () => {
    const navigate = useNavigate();
    const componentRef = useRef(null);
    const dispatch = useDispatch<AppDispatch>();
    const unitsArr = useSelector((state: RootState) => state.store.units);
    const [isSort, setSort] = useState({ name: '', isSort: false });
    const [sortDir, setSortDir] = useState('az');
    const [newForm, setNewForm] = useState(false);
    const [editUnit, setEditUnit] = useState<null | IUnit>(null);
    const [usageUnit, setUsageUnit] = useState<null | IUnit>(null);
    const [historyUnit, setHistoryUnit] = useState<null | IUnit>(null);
    const [printUnits, setPrintUnits] = useState<boolean>(false);
    const currentPage = useSelector((state: RootState) => state.store.currentPage);
    const totalPages = useSelector((state: RootState) => state.store.totalPages);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const [search, setSearch] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>(['Sharjah', 'Manas', 'Aqaba']);


    interface IOption {
        value: string | null;
        label: string | null;
    }

    const titlesArr = [
        { title: 'ata', value: 'ATA' },
        { title: 'pn', value: 'P/N' },
        { title: 'sn', value: 'S/N' },
        { title: 'type', value: 'Part Type' },
        { title: 'desc', value: 'Description' },
        { title: 'grn', value: 'GRN' },
        { title: 'quantity', value: 'Qty.' },
        { title: 'eapack', value: 'EA/Pack' },
        { title: 'location', value: 'Location' },
        { title: 'rack', value: 'Rack' },
        { title: 'shelf', value: 'Shelf' },
        { title: 'condition', value: 'Condition' },
        { title: 'lifelimit', value: 'Life Limit' },
        { title: 'shelflife', value: 'Shelf Life' },
        { title: 'remarks', value: 'Remarks' }
    ]

    const locationOptions = [
        { value: 'All', label: 'All Locations' },
        { value: 'Sharjah', label: 'Sharjah' },
        { value: 'Manas', label: 'Manas' },
        { value: 'Aqaba', label: 'Aqaba' },
    ]

    const titles = () => titlesArr.map((title) => {
        return <Title text={title}
            sort={isSort.name === title.value ? isSort.isSort : false}
            sortDirect={sortDir}
            sortHandler={setSortDir}
            isSortHandler={setSort} />
    }

    )

    const changePage = async (page: number) => {
        setIsLoader(true);
        await dispatch(getUnits({ page: page, searchText: search, locationFilter: selectedLocations, unitsAtPage: 20 }));
        setIsLoader(false);
    }

    const inputOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        await dispatch(getUnits({ page: 1, unitsAtPage: 20, searchText: value, locationFilter: selectedLocations }));
    }

    const findHandler = async () => {
        await dispatch(getUnits({ page: 1, unitsAtPage: 20, searchText: search, locationFilter: selectedLocations }));
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
        await dispatch(getUnits({ page: 1, unitsAtPage: 20, searchText: search, locationFilter: filterArr }));
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

    const units = () => unitsArr.map((unit: IUnit) => <Unit unit={unit}
        editHandler={setEditUnit}
        usageHandler={setUsageUnit}
        historyHandler={setHistoryUnit}
    />
    )

    useEffect(() => {
        dispatch(getUnits({ page: 1, unitsAtPage: 20, locationFilter: selectedLocations }));
    }, [])

    return (
        <div className={s.store} >
            {newForm && <NewUnitForm isNewForm={setNewForm} />}
            {editUnit && <EditUnitForm editUnit={editUnit} isEditUnit={setEditUnit} />}
            {usageUnit && <UsageUnitForm unit={usageUnit} isUsageUnit={setUsageUnit} />}
            {historyUnit && <UnitHistory unit={historyUnit} isHistoryUnit={setHistoryUnit} />}

            <div className={s.search}>
                <img className={s.search__icon} onClick={findHandler} src={magnifIcon} alt="maginf__icon" />
                <Input onChange={inputOnChange} className={s.search__input} placeholder="Find" />
                <div className={s.filter}>
                    <span>Location</span>
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
                </div>

            </div>
            <Pagenator totalPages={totalPages ? totalPages : 1} currentPage={currentPage ? currentPage : 1} changePage={changePage} />
            <div className={s.units__container}>
                <div className={s.unit}>
                    {titles()}
                </div>
                {units()}
            </div>
            {printUnits && <PrintUnitForm isPrintForm={setPrintUnits} searchText={search} locationFilter={selectedLocations} ref={componentRef} />}
            <div className={s.store__buttons} >
                {/* <Button text="Back" btnType="button" color="white" handler={() => navigate('/p')} /> */}
                <Button text="Add" btnType="button" color="green" handler={() => setNewForm(true)} />
                <Button text="Print" btnType="button" color="green" handler={() => setPrintUnits(true)} />
            </div>
        </div>
    )
}

const EnhancedComponent = withSuccessMessage(Store);

export default compose(withErrorMessage)(EnhancedComponent);
