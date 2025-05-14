import { useState } from "react";
import Button from "../../../common/buttons/Button";
import s from "./Requests.module.scss"
import NewRequestForm from "./NewRequestForm/NewRequestForm";

const Requests: React.FC = () => {
    const [isNewForm, setIsNewForm] = useState<boolean>(false)
    return (
        <div className={s.requests}>
            {isNewForm && <NewRequestForm isNewForm={setIsNewForm} />}
            <div className={s.requests__btns}>
                <Button color="green" text="New RFQ" btnType="button" handler={() => setIsNewForm(true)} />
            </div>
            <div className={s.requests__container} >

            </div>

        </div>
    )
}

export default Requests;