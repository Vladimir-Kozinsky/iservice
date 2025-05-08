import { useNavigate } from "react-router-dom";
import s from "./Tools.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../common/buttons/Button";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../common/title/Title";
import Input from "../../../common/inputs/Input";
import magnifIcon from "../../../assets/img/png/magnif__icon.png";
import { ITool } from "../../../types/types";
import withSuccessMessage from "../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../HOC/wirhErrorMessage";
import { compose } from "@reduxjs/toolkit";
import Pagenator from "../../../common/Pagenator/Pagenator";
import Select, { ActionMeta } from 'react-select';
import PrintUnitForm from "./PrintToolForm/PrintToolForm";
import Tool from "./Tool/Tool";
import { getTools } from "../../../store/reducers/toolReducer/toolReducer";
import NewToolForm from "./NewToolForm/NewToolForm";
import EditToolForm from "./EditToolForm/EditToolForm";
import PrintToolForm from "./PrintToolForm/PrintToolForm";

const Tools: React.FC = () => {
    const navigate = useNavigate();
    const componentRef = useRef(null);
    const dispatch = useDispatch<AppDispatch>();
    const toolsArr = useSelector((state: RootState) => state.tool.tools);
    const [isSort, setSort] = useState({ name: '', isSort: false });
    const [sortDir, setSortDir] = useState('az');
    const [newForm, setNewForm] = useState(false);
    const [editTool, setEditTool] = useState<null | ITool>(null);
    const [printUnits, setPrintUnits] = useState<boolean>(false);
    const currentPage = useSelector((state: RootState) => state.tool.currentPage);
    const totalPages = useSelector((state: RootState) => state.tool.totalPages);
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const [search, setSearch] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>(['Sharjah', 'Manas', 'Aqaba', 'Ras-Al-Khaima', 'Ajman', 'Shop', 'EX-37017']);


    interface IOption {
        value: string | null;
        label: string | null;
    }

    const titlesArr = [
        { title: 'pn', value: 'P/N' },
        { title: 'sn', value: 'S/N' },
        { title: 'type', value: 'Type' },
        { title: 'desc', value: 'Description' },
        { title: 'quantity', value: 'Qty.' },
        { title: 'location', value: 'Location' },
        { title: 'rack', value: 'Rack' },
        { title: 'shelf', value: 'Shelf' },
        { title: 'calibration', value: 'Calibr., till' },
        { title: 'remarks', value: 'Remarks' }
    ]

    const locationOptions = [
        { value: 'All', label: 'All Locations' },
        { value: 'Sharjah', label: 'Sharjah' },
        { value: 'Manas', label: 'Manas' },
        { value: 'Aqaba', label: 'Aqaba' },
        { value: 'Ras-Al-Khaima', label: 'Ras-Al-Khaima' },
        { value: 'Ajman', label: 'Ajman' },
        { value: 'Shop', label: 'Shop' },
        { value: 'EX-37017', label: 'EX-37017' },
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
        await dispatch(getTools({ page: page, searchText: search, locationFilter: selectedLocations, toolsAtPage: 20 }));
        setIsLoader(false);
    }

    const inputOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        await dispatch(getTools({ page: 1, toolsAtPage: 20, searchText: value, locationFilter: selectedLocations }));
    }

    const findHandler = async () => {
        await dispatch(getTools({ page: 1, toolsAtPage: 20, searchText: search, locationFilter: selectedLocations }));
    }

    const onChangeLocation = async (newValue: any, actionMeta: ActionMeta<IOption>) => {
        let filterArr = newValue.map((item: any) => item.value);
        filterArr.forEach((element: string) => {
            if (element === 'All') {
                filterArr = ['Sharjah', 'Manas', 'Aqaba', 'Ras-Al-Khaima', 'Ajman', 'Shop', 'EX-37017']
            }
        });
        setSelectedLocations(filterArr);
        setIsLoader(true);
        await dispatch(getTools({ page: 1, toolsAtPage: 20, searchText: search, locationFilter: filterArr }));
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

    const units = () => toolsArr.map((tool: ITool) => <Tool tool={tool}
        editHandler={setEditTool}
    />
    )

    useEffect(() => {
        dispatch(getTools({ page: 1, toolsAtPage: 20, locationFilter: selectedLocations }));
    }, [])

    return (
        <div className={s.store} >
            {newForm && <NewToolForm isNewForm={setNewForm} />}
            {editTool && <EditToolForm editTool={editTool} isEditTool={setEditTool} />}

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
            <div className={s.tools__container}>
                <div className={s.tool}>
                    {titles()}
                </div>
                {units()}
            </div>
            {printUnits && <PrintToolForm isPrintForm={setPrintUnits} searchText={search} locationFilter={selectedLocations} ref={componentRef} />}
            <div className={s.tool__buttons} >
                {/* <Button text="Back" btnType="button" color="white" handler={() => navigate('/p')} /> */}
                <Button text="Add" btnType="button" color="green" handler={() => setNewForm(true)} />
                <Button text="Print" btnType="button" color="green" handler={() => setPrintUnits(true)} />
            </div>
        </div>
    )
}

const EnhancedComponent = withSuccessMessage(Tools);

export default compose(withErrorMessage)(EnhancedComponent);
