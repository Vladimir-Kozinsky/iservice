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
        desc: null,
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

        builder.addCase(getUnits.fulfilled, (state: IStoreState, action: PayloadAction<IUnit[]>) => {
            state.units = action.payload;
            state.successMessage = "Units successfully recieved";
        })
        builder.addCase(getUnits.rejected, (state: IStoreState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
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

export const getUnits = createAsyncThunk(
    'unit/units',
    async (none, thunkAPI) => {
        try {
            const response = await storeAPI.getUnits();
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