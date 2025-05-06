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
        content: () => componentRef.current,
    });

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
        (async ()=>{
           await dispatch(getPrintUnits({ searchText: searchText, locationFilter: locationFilter }));
           await handlePrint();
           await isPrintForm(false);
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
                    {/* <button className={s.PrintUnitForm__buttons__print} onClick={handlePrint} ><img src={printIcon} alt="icon" /> </button> */}
                    <Button text="Print" color="green" btnType="button" handler={handlePrint} />
                </div>
                <div ref={componentRef} >
                    <div className={s.unit}>
                        {titles()}
                    </div>
                    {units()}
                </div>
            </div>

        </div>
    )
})

export default PrintUnitForm;