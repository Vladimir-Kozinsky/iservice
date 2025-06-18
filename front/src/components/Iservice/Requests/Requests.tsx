import { useEffect, useState } from "react";
import Button from "../../../common/buttons/Button";
import s from "./Requests.module.scss"
import NewRequestForm from "./NewRequestForm/NewRequestForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getOrders, getRequests } from "../../../store/reducers/requestReducer/RequestReducer";
import RequestStatus from "./RequestSatus/RequestStatus";
import OrderStatus from "./OrderStatus/OrderStatus";
import Select, { ActionMeta, MultiValue } from 'react-select';
import Loader from "../../../common/Loader/Loader";
import { Transition } from "react-transition-group";
import Pagenator from "../../../common/Pagenator/Pagenator";
import withSuccessMessage from "../../../HOC/wirhSuccessMessage";
import withErrorMessage from "../../../HOC/wirhErrorMessage";
import { compose } from "@reduxjs/toolkit";
import { IOrder, IRequest } from "../../../store/reducers/requestReducer/RequestReducerTypes";



const ordersFilterOptions = [
    { value: 'all', label: 'All' },
    { value: 'open', label: 'Open' },
    { value: 'created', label: 'Created' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'approved', label: 'Approved' },
    { value: 'paid', label: 'Paid' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'recieved', label: 'Recieved' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'closed', label: 'Closed' },
]

const requestsFilterOptions = [
    { value: 'all', label: 'All' },
    { value: 'open', label: 'Open' },
    { value: 'created', label: 'Created' },
    { value: 'approved', label: 'Approved' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'closed', label: 'Closed' },
]

interface IOption {
    value: string | null;
    label: string | null;
}

const Requests: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const requests = useSelector((state: RootState) => state.request.requests);
    const orders = useSelector((state: RootState) => state.request.orders);
    const [isNewForm, setIsNewForm] = useState<boolean>(false)
    const [isLoader, setIsLoader] = useState<boolean | undefined>(false);
    const currentPage = useSelector((state: RootState) => state.request.currentPage);
    const totalPages = useSelector((state: RootState) => state.request.totalPages);
    const currentOrdersPage = useSelector((state: RootState) => state.request.currentOrdersPage);
    const totalOrdersPages = useSelector((state: RootState) => state.request.totalOrdersPages);
    const [selectedOrderFilters, setSelectedOrderFilters] = useState<string[]>(['created', 'accepted', 'approved', 'paid', 'shipped', 'recieved']);
    const [selectedRequestFilters, setSelectedRequestFilters] = useState<string[]>(['created', 'closed', 'approved', 'cancelled']);

    const changePage = async (page: number) => {
        setIsLoader(true);
        await dispatch(getRequests({ page: page, requestsAtPage: 10, statusFilter: selectedRequestFilters, }));
        setIsLoader(false);
    }

    const changeOrdersPage = async (page: number) => {
        setIsLoader(true);
        await dispatch(getOrders({ page: page, ordersAtPage: 10, statusFilter: selectedOrderFilters, }));
        setIsLoader(false);
    }

    const onChangeOrderFilter = async (newValue: any, actionMeta: ActionMeta<IOption>) => {
        let filterArr = newValue.map((item: any) => item.value);
        filterArr.forEach((element: string) => {
            if (element === 'all') {
                filterArr = ['created', 'closed', 'accepted', 'approved', 'paid', 'shipped', 'recieved', 'cancelled']
            }

            if (element === 'open') {
                filterArr = ['created', 'accepted', 'approved', 'paid', 'shipped', 'recieved']
            }

        });

        setSelectedOrderFilters(filterArr);
        setIsLoader(true);
        await dispatch(getOrders({ page: 1, ordersAtPage: 10, statusFilter: filterArr }));
        setIsLoader(false);
    }

    const onChangeRequestFilter = async (newValue: any, actionMeta: ActionMeta<IOption>) => {
        let filterArr = newValue.map((item: any) => item.value);
        filterArr.forEach((element: string) => {
            if (element === 'all') {
                filterArr = ['created', 'closed', 'approved', 'cancelled']
            }
        });

        setSelectedRequestFilters(filterArr);
        setIsLoader(true);
        await dispatch(getRequests({ page: 1, requestsAtPage: 10, statusFilter: filterArr }));
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
            margin: '10px 0 20px 0'
        }),
    }

    useEffect(() => {
        (async () => {
            setIsLoader(true)
            await dispatch(getRequests({ page: 1, requestsAtPage: 10, statusFilter: selectedRequestFilters }));
            await dispatch(getOrders({ page: 1, ordersAtPage: 10, statusFilter: selectedOrderFilters }));
            setIsLoader(false)
        })()

    }, [])
    return (
        <div className={s.requests}>
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            {isNewForm && <NewRequestForm isNewForm={setIsNewForm} />}

            <div className={s.requests__btns}>
                <Button color="green" text="New RFQ" btnType="button" handler={() => setIsNewForm(true)} />
            </div>

            <div className={s.requests__container}>
                <div className={s.request__wrapper}>
                    <h3>Requests</h3>
                    <div className={s.select__wrapper}>
                        <Select
                            onChange={onChangeRequestFilter}
                            styles={customStyles}
                            defaultValue={[requestsFilterOptions[0]]}
                            isMulti
                            name="filters"
                            options={requestsFilterOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    {requests.length
                        ? <Pagenator totalPages={totalPages ? totalPages : 1} currentPage={currentPage ? currentPage : 1} changePage={changePage} />
                        : <div className={s.request__wrapper__message}>No requests are found</div>}
                    <div className={s.widgets} >
                        {requests.map((request: IRequest) => <RequestStatus request={request} />)}
                    </div>
                </div>
                <div className={s.request__wrapper}>
                    <h3>Purchase orders</h3>
                    <div className={s.select__wrapper}>
                        <Select
                            onChange={onChangeOrderFilter}
                            styles={customStyles}
                            defaultValue={[ordersFilterOptions[0]]}
                            isMulti
                            name="filters"
                            options={ordersFilterOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    {orders.length
                        ? <Pagenator totalPages={totalOrdersPages ? totalOrdersPages : 1} currentPage={currentOrdersPage ? currentOrdersPage : 1} changePage={changeOrdersPage} />
                        : <div className={s.request__wrapper__message}>No requests are found</div>}
                    <div className={s.widgets} >
                        {orders.map((order: IOrder) => <OrderStatus order={order} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const EnhancedComponent = withSuccessMessage(Requests);

export default compose(withErrorMessage)(EnhancedComponent);