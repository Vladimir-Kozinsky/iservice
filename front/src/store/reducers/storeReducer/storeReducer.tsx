import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICreateUnitDto, IStoreState, IUnitRejectResponse } from './storeReducerTypes';
import { IUnit } from '../../../types/types';
import storeAPI from '../../../API/storeAPI';

const initialState: IStoreState = {
    choosedUnit: {
        _id: null,
        ata: null,
        pn: null,
        sn: null,
        type: null,
        disc: null,
        grn: null,
        quantity: null,
        eapack: null,
        location: null,
        condition: null,
        lifelimit: null,
        shelflife: null,
        certificate: null,
        remarks: null,
    },
    units: [],
    totalPages: null,
    currentPage: null,
    errorMessage: null,
    successMessage: null,
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {

        clearLegSuccessMessage(state: IStoreState) {
            state.successMessage = null;
        },

        clearLegErrorMessage(state: IStoreState) {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUnit.fulfilled, (state: IStoreState, action: PayloadAction<IUnit>) => {
            state.units.push(action.payload);
            state.successMessage = "Leg successfully added";
        })
        builder.addCase(createUnit.rejected, (state: IStoreState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        // builder.addCase(deleteLeg.fulfilled, (state: ILegState, action: PayloadAction<ILeg>) => {
        //     const legId = action.payload._id;
        //     const legIndex = state.legs.findIndex((leg: ILeg) => leg._id === legId);
        //     const legs = state.legs;
        //     legs.splice(legIndex, 1);
        //     state.legs = legs;
        //     state.successMessage = "Leg successfully deleted";
        // })
        // builder.addCase(deleteLeg.rejected, (state: ILegState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })

        // builder.addCase(getLegs.fulfilled, (state: ILegState, action: PayloadAction<IGetLegsResponseDto>) => {
        //     state.legs = action.payload.legs;
        //     state.totalPages = action.payload.totalPages;
        //     state.currentPage = action.payload.currentPage;
        // })
        // builder.addCase(getLegs.rejected, (state: ILegState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })

        // builder.addCase(getPrintLegs.fulfilled, (state: ILegState, action: PayloadAction<ILeg[]>) => {
        //     state.printLegs = action.payload;
        // })
        // builder.addCase(getPrintLegs.rejected, (state: ILegState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })

        // builder.addCase(getlastTenLegs.fulfilled, (state: ILegState, action: PayloadAction<ILeg[]>) => {
        //     state.legs = action.payload;
        //     state.totalPages = 1;
        //     state.currentPage = 1;
        // })
        // builder.addCase(getlastTenLegs.rejected, (state: ILegState, action: PayloadAction<any>) => {
        //    // state.errorMessage = action.payload.message;
        // })
    },
})

export const createUnit = createAsyncThunk(
    'unit/create',
    async (createLegDto: ICreateUnitDto, thunkAPI) => {
        try {
            const response = await storeAPI.createUnit(createLegDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IUnitRejectResponse);
        }
    }
)

// export const deleteLeg = createAsyncThunk(
//     'leg/delete',
//     async (deleteLegDto: ILeg, thunkAPI) => {
//         try {
//             const response = await legAPI.deleteLeg(deleteLegDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as ILegRejectResponse);
//         }
//     }
// )

// export const getLegs = createAsyncThunk(
//     'leg/legs',
//     async (getLegsDto: IGetLegsDto, thunkAPI) => {
//         try {
//             const response = await legAPI.getLegs(getLegsDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as ILegRejectResponse);
//         }
//     }
// )
// export const getPrintLegs = createAsyncThunk(
//     'leg/legs/print',
//     async (getPrintLegsDto: IGetPrintLegsDto, thunkAPI) => {
//         try {
//             const response = await legAPI.getPrintLegs(getPrintLegsDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as ILegRejectResponse);
//         }
//     }
// )

// export const getlastTenLegs = createAsyncThunk(
//     'leg/legs/last',
//     async (aircraft: string, thunkAPI) => {
//         try {
//             const response = await legAPI.getLastTenLegs(aircraft);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as ILegRejectResponse);
//         }
//     }
// )




export const { clearLegSuccessMessage, clearLegErrorMessage } = storeSlice.actions

export default storeSlice.reducer;