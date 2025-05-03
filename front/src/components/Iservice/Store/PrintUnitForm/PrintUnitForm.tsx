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
        'ATA', 'P/N', 'S/N', 'Part Type', 'Description', 'GRN', 'Qty.', 'EA/Packs',
        'Location', 'Rack', 'Shelf', 'Condition', 'Life Limit', 'Shelf Life', 'Remarks'
    ]

    const titles = () => titlesArr.map((title) => <PrintTitle text={title} />
    )

    useEffect(() => {
        dispatch(getPrintUnits({ searchText: searchText, locationFilter: locationFilter }));
    }, [])

    const units = () => unitsToPrint.map((unit: IUnit) => <UnitToPrint unit={unit}
    />
    )


    return (
        <div className={s.PrintUnitForm__container}>
            <div className={s.PrintUnitForm__wrapper}>
                <button className={s.PrintUnitForm__btn} onClick={() => isPrintForm(false)} ><img src={crosIcon} alt="icon" /> </button>
                <div className={s.PrintUnitForm__buttons} >
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