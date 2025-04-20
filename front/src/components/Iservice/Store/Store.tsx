import { useNavigate } from "react-router-dom";
import s from "./Store.module.scss";
import React, { useState } from "react";
import Button from "../../../common/buttons/Button";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Title from "../../../common/title/Title";
import Input from "../../../common/inputs/Input";
import magnifIcon from "../../../assets/img/png/magnif__icon.png";



const Store: React.FC = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isSort, setSort] = useState({ name: '', isSort: false });
    const [sortDir, setSortDir] = useState('az');

    const titlesArr = [
        'ATA', 'P/N', 'S/N', 'Part Type', 'Discription', 'GRN', 'Quantity', 'EA/Packs',
        'Location', 'Condition', 'Life Limit', 'Shelf Life', 'Certificate', 'Remarks'
    ]

    const titles = () => titlesArr.map((title) => <Title text={title}
        sort={isSort.name === title ? isSort.isSort : false}
        sortDirect={sortDir}
        sortHandler={setSortDir}
        isSortHandler={setSort} />
    )

    return (
        <div className={s.store} >
            <h1 className={s.store__header}>Store</h1>
            <div className={s.search}>
                <img className={s.search__icon} src={magnifIcon} alt="maginf__icon" />
                <Input className={s.search__input} placeholder="Find" />
            </div>
            <div className={s.unit}>
                {titles()}
            </div>

            <div className={s.store__buttons} >
                <Button text="Back"
                    color="white"
                    btnType={"button"}
                    handler={() => navigate('/i-service')} />
                {user.role === "admin" && <Button text="Add User"
                    color="green"
                    btnType={"button"}
                    handler={() => navigate('/signup')} />}
            </div>
        </div>
    )
}

export default Store;