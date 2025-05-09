import { useDispatch, useSelector } from "react-redux";
import s from "./PrintUnitForm.module.scss"
import { AppDispatch, RootState } from "../../../../store/store";
import React, { useEffect, useRef, useState } from "react";
import { IUnit } from "../../../../types/types";
import { useReactToPrint } from "react-to-print";
import { getPrintUnits } from "../../../../store/reducers/storeReducer/storeReducer";
import Unit from "../Unit/Unit";
import UnitToPrint from "../UnitToPrint/UnitToPrint";
import Button from "../../../../common/buttons/Button";
import Title from "../../../../common/title/Title";
import PrintTitle from "../../../../common/printTitle/PrintTitle";
import crosIcon from '../../../../assets/img/png/cross-input.png';
import printIcon from '../../../../assets/img/png/print-icon.png';
import exelIcon from '../../../../assets/img/png/exel.png';
import { CSVLink } from "react-csv";

// const csvData = [
//     ["firstname", "lastname", "email"],
//     ["Ahmed", "Tomi", "ah@smthing.co.com"],
//     ["Raed", "Labes", "rl@smthing.co.com"],
//     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
// ];

type PrintUnitFormPropsType = {
    searchText: string;
    locationFilter: string[];
    isPrintForm: (isForm: boolean) => void;
}

const PrintUnitForm = React.forwardRef(({ searchText, locationFilter, isPrintForm }: PrintUnitFormPropsType, ref: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const componentRef = useRef(null);
    const unitsToPrint = useSelector((state: RootState) => state.store.unitsToPrint);

    const handlePrint = useReactToPrint({
        content: () => {
            isPrintForm(false)
            return componentRef.current
        }
    });


    const csvData = unitsToPrint.map((unit: IUnit) => {
        return [unit.ata, unit.pn, unit.sn, unit.type, unit.desc,
        unit.quantity, unit.eapack, unit.location,
        unit.rack, unit.shelf, unit.condition,
        unit.lifelimit, unit.shelflife, unit.remarks]
    })

    const arr = [
        ['ATA', 'P/N', 'S/N', 'Part Type', 'Description', 'Qty.', 'EA/Pack',
            'Location', 'Rack', 'Shelf', 'Condition', 'Life Limit', 'Shelf Life', 'Remarks'],
        ...csvData
    ]

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

    const titles = () => titlesArr.map((title) => <PrintTitle text={title} />
    )

    useEffect(() => {
        (async () => {
            await dispatch(getPrintUnits({ searchText: searchText, locationFilter: locationFilter }));
        })()

    }, [])

    const units = () => unitsToPrint.map((unit: IUnit) => <UnitToPrint unit={unit}
    />
    )


    return (
        <div className={s.PrintUnitForm__container}>
            <div className={s.PrintUnitForm__wrapper}>
                <button className={s.PrintUnitForm__btn} onClick={() => isPrintForm(false)} ><img src={crosIcon} alt="icon" /> </button>
                <div className={s.PrintUnitForm__buttons} >
                    <button className={s.PrintUnitForm__buttons__print} onClick={handlePrint}><img className={s.button__img__print} src={printIcon} alt="icon" /> </button>
                    <button className={s.PrintUnitForm__buttons__exel} ><CSVLink data={arr}  filename={"iservice-export.csv"}><img className={s.button__img__exel} src={exelIcon} alt="icon" /></CSVLink>;  </button>
                </div>
                <div className={s.print__block}>
                    <div ref={componentRef} >
                        <div className={s.unit}>
                            {titles()}
                        </div>
                        {units()}
                    </div>
                </div>

            </div>

        </div>
    )
})

export default PrintUnitForm;