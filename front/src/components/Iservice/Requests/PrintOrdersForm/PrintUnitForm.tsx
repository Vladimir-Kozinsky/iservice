import { useDispatch, useSelector } from "react-redux";
import s from "./PrintUnitForm.module.scss"
import { AppDispatch, RootState } from "../../../../store/store";
import React, { useEffect, useRef, useState } from "react";
import { IUnit } from "../../../../types/types";
import { useReactToPrint } from "react-to-print";
import { getPrintUnits } from "../../../../store/reducers/storeReducer/storeReducer";
import UnitToPrint from "../OrderToPrint/OrderToPrint";
import Button from "../../../../common/buttons/Button";
import Title from "../../../../common/title/Title";
import PrintTitle from "../../../../common/printTitle/PrintTitle";
import crosIcon from '../../../../assets/img/png/cross-input.png';
import printIcon from '../../../../assets/img/png/print-icon.png';
import exelIcon from '../../../../assets/img/png/exel.png';
import { CSVLink } from "react-csv";
import { IOrder } from "../../../../store/reducers/RequestReducer/requestReducerTypes";
import { getPrintOrders } from "../../../../store/reducers/RequestReducer/RequestReducer";
import OrderToPrint from "../OrderToPrint/OrderToPrint";
import { IOrderItemType } from "../NewPoForm/OrderItemForm/OrderItemForm";
import { it } from "node:test";




type PrintOrdersFormPropsType = {
    searchText: string;
    statusFilter: string[];
    isPrintForm: (isForm: boolean) => void;
}

const PrintOrdersForm = React.forwardRef(({ searchText, statusFilter, isPrintForm }: PrintOrdersFormPropsType, ref: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const componentRef = useRef(null);
    const ordersToPrint = useSelector((state: RootState) => state.request.ordersToPrint);

    const handlePrint = useReactToPrint({
        content: () => {
            isPrintForm(false)
            return componentRef.current
        }
    });


    const csvData = ordersToPrint.map((order: IOrder) => {

        const items = order.items.map((item: IOrderItemType) => `${item.pn}-${item.desc}` )

        return [order.requestNumber, order.poNumber, order.poDate, items.toString(), order.supplier, order.poPrice, order.status]
    })

    const arr = [
        ['RFQ No.', 'PO No.', 'PO date', 'Units', 'Supplier', 'Total Price', 'Status'],
        ...csvData
    ]

    const titlesArr = [
        { title: 'number', value: 'RFQ No.' },
        { title: 'number', value: 'PO No.' },
        { title: 'date', value: 'PO date' },
        { title: 'unit', value: 'Units' },
        { title: 'supplier', value: 'Supplier' },
        { title: 'price', value: 'Total Price' },
        { title: 'status', value: 'Status' }
    ]

    const titles = () => titlesArr.map((title) => <PrintTitle text={title} />
    )

    useEffect(() => {
        (async () => {
            await dispatch(getPrintOrders({ statusFilter: statusFilter }));
        })()

    }, [])

    const orders = () => ordersToPrint.map((order: IOrder) => <OrderToPrint order={order}
    />
    )


    return (
        <div className={s.PrintUnitForm__container}>
            <div className={s.PrintUnitForm__wrapper}>
                <button className={s.PrintUnitForm__btn} onClick={() => isPrintForm(false)} ><img src={crosIcon} alt="icon" /> </button>
                <div className={s.PrintUnitForm__buttons} >
                    <button className={s.PrintUnitForm__buttons__print} onClick={handlePrint}><img className={s.button__img__print} src={printIcon} alt="icon" /> </button>
                    <button className={s.PrintUnitForm__buttons__exel} >
                        <CSVLink data={arr}
                            separator=";"
                            filename={"iservice-export.csv"}><img className={s.button__img__exel} src={exelIcon} alt="icon" />
                        </CSVLink></button>
                </div>
                <div className={s.print__block}>
                    <div ref={componentRef} >
                        <div className={s.unit}>
                            {titles()}
                        </div>
                        {orders()}
                    </div>
                </div>

            </div>

        </div>
    )
})

export default PrintOrdersForm;