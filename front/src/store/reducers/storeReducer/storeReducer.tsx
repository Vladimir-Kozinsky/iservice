import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChangeUnitDto, ICreateUnitDto, IDeleteUnitDto, IGetPrintUnitsDto, IGetUnitsDto, IGetUnitsResponseDto, IStoreState, IUnitRejectResponse, IUsageUnitDto } from './storeReducerTypes';
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
        rack: null,
        shelf: null,
        condition: null,
        lifelimit: null,
        shelflife: null,
        remarks: null,
    },
    units: [],
    unitsToPrint: [],
    totalPages: null,
    currentPage: null,
    errorMessage: null,
    successMessage: null,
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {

        clearStoreSuccessMessage(state: IStoreState) {
            state.successMessage = null;
        },

        clearStoreErrorMessage(state: IStoreState) {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUnit.fulfilled, (state: IStoreState, action: PayloadAction<IUnit>) => {
            state.units.push(action.payload);
            state.successMessage = "Unit successfully added";
        })
        builder.addCase(createUnit.rejected, (state: IStoreState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(changeUnit.fulfilled, (state: IStoreState, action: PayloadAction<IUnit>) => {
            const changedUnitIndex = state.units.findIndex((unit: IUnit) => unit._id === action.payload._id)
            state.units[changedUnitIndex] = action.payload;
            state.successMessage = "Unit successfully updated";
        })
        builder.addCase(changeUnit.rejected, (state: IStoreState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(deleteUnit.fulfilled, (state: IStoreState, action: PayloadAction<IUnit>) => {
            const deletedUnitIndex = state.units.findIndex((unit: IUnit) => unit.sn === action.payload.sn)
            state.units.splice(deletedUnitIndex, 1);
            state.successMessage = "Unit successfully deleted";
        })
        builder.addCase(deleteUnit.rejected, (state: IStoreState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(getUnits.fulfilled, (state: IStoreState, action: PayloadAction<IGetUnitsResponseDto>) => {
            state.units = action.payload.units;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        })
        builder.addCase(getUnits.rejected, (state: IStoreState, action: PayloadAction<any>) => {
            //state.errorMessage = action.payload.message;
            state.units = [];
        })

        builder.addCase(getPrintUnits.fulfilled, (state: IStoreState, action: PayloadAction<IUnit[]>) => {
            state.unitsToPrint = action.payload;
        })
        builder.addCase(getPrintUnits.rejected, (state: IStoreState, action: PayloadAction<any>) => {
            //state.errorMessage = action.payload.message;
            state.unitsToPrint = [];
        })

        builder.addCase(updateUnit.fulfilled, (state: IStoreState, action: PayloadAction<IUnit>) => {
            const changedUnitIndex = state.units.findIndex((unit: IUnit) => unit._id === action.payload._id)
            state.units[changedUnitIndex] = action.payload;
            state.successMessage = "Unit successfully updated";
        })
        builder.addCase(updateUnit.rejected, (state: IStoreState, action: PayloadAction<any>) => {
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

export const changeUnit = createAsyncThunk(
    'unit/edit',
    async (editUnitDto: IChangeUnitDto, thunkAPI) => {
        try {
            const response = await storeAPI.editUnit(editUnitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IUnitRejectResponse);
        }
    }
)

export const deleteUnit = createAsyncThunk(
    'unit/delete',
    async (deleteUnitDto: IDeleteUnitDto, thunkAPI) => {
        try {
            const response = await storeAPI.deleteUnit(deleteUnitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IUnitRejectResponse);
        }
    }
)

export const getUnits = createAsyncThunk(
    'unit/units',
    async (getUnitsDto: IGetUnitsDto, thunkAPI) => {
        try {
            const response = await storeAPI.getUnits(getUnitsDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IUnitRejectResponse);
        }
    }
)

export const getPrintUnits = createAsyncThunk(
    'unit/print',
    async (getPrintUnitsDto: IGetPrintUnitsDto, thunkAPI) => {
        try {
            const response = await storeAPI.getPrintUnits(getPrintUnitsDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IUnitRejectResponse);
        }
    }
)

export const updateUnit = createAsyncThunk(
    'unit/use',
    async (useUnitDto: IUsageUnitDto, thunkAPI) => {
        try {
            const response = await storeAPI.useUnit(useUnitDto);
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




export const { clearStoreSuccessMessage, clearStoreErrorMessage } = storeSlice.actions

export default storeSlice.reducer;