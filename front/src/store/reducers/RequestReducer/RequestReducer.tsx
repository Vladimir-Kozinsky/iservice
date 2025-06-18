import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITool } from '../../../types/types';
import storeAPI from '../../../API/storeAPI';
import { IUsageUnitDto } from '../storeReducer/storeReducerTypes';
import toolAPI from '../../../API/toolAPI';
import { IAcceptOrderDto, IApproveOrderDto, IApproveRequest, ICancelOrderDto, ICancelRequestDto, ICreateOrderDto, ICreateRequestDto, IGetOrdersDto, IGetOrdersResponseDto, IGetRequestsDto, IGetRequestsResponseDto, IOrder, IRequest, IRequestRejectResponse, IRequestState, IUpdateOrderStatusDto } from '../requestReducer/RequestReducerTypes';
import requestAPI from '../../../API/requestAPI';
import orderAPI from '../../../API/orderAPI';

const initialState: IRequestState = {
    choosedRequest: {
        _id: null,
        requestNumber: null,
        date: null,
        priority: null,
        items: null,
        status: null,
        statusHistory: [],
    },
    requests: [],
    orders: [],
    requestsToPrint: [],
    totalPages: null,
    currentPage: null,
    totalOrdersPages: null,
    currentOrdersPage: null,
    errorMessage: null,
    successMessage: null,
}

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {

        clearRequestSuccessMessage(state: IRequestState) {
            state.successMessage = null;
        },

        clearRequestErrorMessage(state: IRequestState) {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createRequest.fulfilled, (state: IRequestState, action: PayloadAction<IRequest>) => {
            state.requests.push(action.payload);
            state.successMessage = "Request successfully created";
        })
        builder.addCase(createRequest.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(approveRequest.fulfilled, (state: IRequestState, action: PayloadAction<IRequest>) => {
            const changedRequestIndex = state.requests.findIndex((request: IRequest) => request._id === action.payload._id)
            state.requests[changedRequestIndex] = action.payload;
            state.successMessage = "Request successfully approved";
        })
        builder.addCase(approveRequest.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })


        builder.addCase(acceptOrder.fulfilled, (state: IRequestState, action: PayloadAction<IOrder>) => {
            const changedOrderIndex = state.orders.findIndex((order: IOrder) => order._id === action.payload._id)
            state.orders[changedOrderIndex] = action.payload;
            state.successMessage = "Order successfully accepted";
        })
        builder.addCase(acceptOrder.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(cancelOrder.fulfilled, (state: IRequestState, action: PayloadAction<IOrder>) => {
            const changedOrderIndex = state.orders.findIndex((order: IOrder) => order._id === action.payload._id)
            state.orders[changedOrderIndex] = action.payload;
            state.successMessage = "Order successfully cancelled";
        })
        builder.addCase(cancelOrder.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(cancelRequest.fulfilled, (state: IRequestState, action: PayloadAction<IRequest>) => {
            const changedRequestIndex = state.requests.findIndex((request: IRequest) => request._id === action.payload._id)
            state.requests[changedRequestIndex] = action.payload;
            state.successMessage = "Request successfully cancelled";
        })
        builder.addCase(cancelRequest.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(approveOrder.fulfilled, (state: IRequestState, action: PayloadAction<IOrder>) => {
            const changedOrderIndex = state.orders.findIndex((order: IOrder) => order._id === action.payload._id)
            state.orders[changedOrderIndex] = action.payload;
            state.successMessage = "Order successfully approved";
        })
        builder.addCase(approveOrder.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(updateOrderStatus.fulfilled, (state: IRequestState, action: PayloadAction<IOrder>) => {
            const changedOrderIndex = state.orders.findIndex((order: IOrder) => order._id === action.payload._id)
            state.orders[changedOrderIndex] = action.payload;
            state.successMessage = "Order status successfully updated";
        })
        builder.addCase(updateOrderStatus.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })


        // builder.addCase(changeTool.fulfilled, (state: IRequestState, action: PayloadAction<ITool>) => {
        //     const changedUnitIndex = state.tools.findIndex((unit: ITool) => unit._id === action.payload._id)
        //     state.tools[changedUnitIndex] = action.payload;
        //     state.successMessage = "Tool successfully updated";
        // })
        // builder.addCase(changeTool.rejected, (state: IToolState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })

        // builder.addCase(deleteTool.fulfilled, (state: IToolState, action: PayloadAction<ITool>) => {
        //     const deletedUnitIndex = state.tools.findIndex((unit: ITool) => unit.sn === action.payload.sn)
        //     state.tools.splice(deletedUnitIndex, 1);
        //     state.successMessage = "Tool successfully deleted";
        // })
        // builder.addCase(deleteTool.rejected, (state: IToolState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })

        builder.addCase(getRequests.fulfilled, (state: IRequestState, action: PayloadAction<IGetRequestsResponseDto>) => {
            state.requests = action.payload.requests;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        })
        builder.addCase(getRequests.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            //state.errorMessage = action.payload.message;
            state.requests = [];
        })

        // builder.addCase(getPrintTools.fulfilled, (state: IToolState, action: PayloadAction<ITool[]>) => {
        //     state.toolsToPrint = action.payload;
        // })
        // builder.addCase(getPrintTools.rejected, (state: IToolState, action: PayloadAction<any>) => {
        //     //state.errorMessage = action.payload.message;
        //     state.toolsToPrint = [];
        // })

        builder.addCase(createOrder.fulfilled, (state: IRequestState, action: PayloadAction<IOrder>) => {
            state.orders.push(action.payload);
            state.successMessage = "Order successfully created";
        })
        builder.addCase(createOrder.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(getOrders.fulfilled, (state: IRequestState, action: PayloadAction<IGetOrdersResponseDto>) => {
            state.orders = action.payload.orders;
            state.currentOrdersPage = action.payload.currentPage;
            state.totalOrdersPages = action.payload.totalPages;
        })
        builder.addCase(getOrders.rejected, (state: IRequestState, action: PayloadAction<any>) => {
            //state.errorMessage = action.payload.message;
            state.orders = [];
        })

    },
})

export const createRequest = createAsyncThunk(
    'request/create',
    async (createRequestDto: ICreateRequestDto, thunkAPI) => {
        try {
            const response = await requestAPI.create(createRequestDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

export const approveRequest = createAsyncThunk(
    'request/approve',
    async (approveRequestDto: IApproveRequest, thunkAPI) => {
        try {
            const response = await requestAPI.approve(approveRequestDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

export const createOrder = createAsyncThunk(
    'order/create',
    async (createOrderDto: ICreateOrderDto, thunkAPI) => {
        try {
            const response = await orderAPI.create(createOrderDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

export const getOrders = createAsyncThunk(
    'order/orders',
    async (getOrdersDto: IGetOrdersDto, thunkAPI) => {
        try {
            const response = await orderAPI.getOrders(getOrdersDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

export const acceptOrder = createAsyncThunk(
    'order/accept',
    async (acceptOrderDto: IAcceptOrderDto, thunkAPI) => {
        try {
            const response = await orderAPI.accept(acceptOrderDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

export const cancelOrder = createAsyncThunk(
    'order/cancel',
    async (cancelOrderDto: ICancelOrderDto, thunkAPI) => {
        try {
            const response = await orderAPI.cancel(cancelOrderDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

export const cancelRequest = createAsyncThunk(
    'request/cancel',
    async (cancelRequestDto: ICancelRequestDto, thunkAPI) => {
        try {
            const response = await requestAPI.cancelRequest(cancelRequestDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

export const approveOrder = createAsyncThunk(
    'order/approve',
    async (approveOrderDto: IApproveOrderDto, thunkAPI) => {
        try {
            const response = await orderAPI.approve(approveOrderDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)
export const updateOrderStatus = createAsyncThunk(
    'order/status/update',
    async (updateOrderStatusDto: IUpdateOrderStatusDto, thunkAPI) => {
        try {
            const response = await orderAPI.updateOrderStatus(updateOrderStatusDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)



// export const changeTool = createAsyncThunk(
//     'tool/edit',
//     async (editUnitDto: IChangeTooltDto, thunkAPI) => {
//         try {
//             const response = await toolAPI.editTool(editUnitDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
//         }
//     }
// )

// export const deleteTool = createAsyncThunk(
//     'tool/delete',
//     async (deleteUnitDto: IDeleteToolDto, thunkAPI) => {
//         try {
//             const response = await toolAPI.deleteTool(deleteUnitDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
//         }
//     }
// )

export const getRequests = createAsyncThunk(
    'request/requests',
    async (getRequestsDto: IGetRequestsDto, thunkAPI) => {
        try {
            const response = await requestAPI.getRequests(getRequestsDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IRequestRejectResponse);
        }
    }
)

// export const getPrintTools = createAsyncThunk(
//     'tool/print',
//     async (getPrintUnitsDto: IGetPrintToolsDto, thunkAPI) => {
//         try {
//             const response = await toolAPI.getPrintTools(getPrintUnitsDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
//         }
//     }
// )




export const { clearRequestSuccessMessage, clearRequestErrorMessage } = requestSlice.actions

export default requestSlice.reducer;