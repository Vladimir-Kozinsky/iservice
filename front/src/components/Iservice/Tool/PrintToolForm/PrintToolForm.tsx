import { useDispatch, useSelector } from "react-redux";
import s from "./PrintToolForm.module.scss"
import { AppDispatch, RootState } from "../../../../store/store";
import React, { useEffect, useRef, useState } from "react";
import { ITool, IUnit } from "../../../../types/types";
import { useReactToPrint } from "react-to-print";
import { getPrintUnits } from "../../../../store/reducers/storeReducer/storeReducer";
import Button from "../../../../common/buttons/Button";
import PrintTitle from "../../../../common/printTitle/PrintTitle";
import crosIcon from '../../../../assets/img/png/cross-input.png';
import ToolToPrint from "../ToolToPrint/ToolToPrint";
import { getPrintTools } from "../../../../store/reducers/toolReducer/toolReducer";

type PrintToolFormPropsType = {
    searchText: string;
    locationFilter: string[];
    isPrintForm: (isForm: boolean) => void;
}

const PrintToolForm = React.forwardRef(({ searchText, locationFilter, isPrintForm }: PrintToolFormPropsType, ref: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const componentRef = useRef(null);
    const toolsToPrint = useSelector((state: RootState) => state.tool.toolsToPrint);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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

    const titles = () => titlesArr.map((title) => <PrintTitle text={title} />
    )

    useEffect(() => {
        (async ()=>{
           await dispatch(getPrintTools({ searchText: searchText, locationFilter: locationFilter }));
           await handlePrint();
           await isPrintForm(false);
        })()
       
    }, [])

    const units = () => toolsToPrint.map((tool: ITool) => <ToolToPrint tool={tool}
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

export default PrintToolForm;