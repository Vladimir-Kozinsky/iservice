import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICreateLegDto, ILegRejectResponse, ILegState } from './legReducerTypes';
import legAPI from '../../../API/legAPI';
import { ILeg } from '../../../types/types';

const initialState: ILegState = {
    choosedLeg: {
        _id: null,
        aircraft: null,
        engines: null,
        apu: null,
        depDate: null,
        flightNumber: null,
        from: null,
        to: null,
        blockOff: null,
        takeOff: null,
        landing: null,
        blockOn: null,
        flightTime: null,
        blockTime: null,
        fh: null,
        fc: null,
    },
    legs: [],
    errorMessage: null,
    successMessage: null,
}

const legSlice = createSlice({
    name: 'leg',
    initialState,
    reducers: {

        clearSuccessMessage(state: ILegState) {
            state.successMessage = null;
        },

        clearErrorMessage(state: ILegState) {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createLeg.fulfilled, (state: ILegState, action: PayloadAction<ILeg>) => {
            state.legs.push(action.payload);
            state.successMessage = "Leg successfully added";
        })
        builder.addCase(createLeg.rejected, (state: ILegState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(deleteLeg.fulfilled, (state: ILegState, action: PayloadAction<ILeg>) => {
            // state.legs.push(action.payload); TO DO
            state.successMessage = "Leg successfully deleted";
        })
        builder.addCase(deleteLeg.rejected, (state: ILegState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(getLegs.fulfilled, (state: ILegState, action: PayloadAction<ILeg[]>) => {
            state.legs = action.payload;
        })
        builder.addCase(getLegs.rejected, (state: ILegState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
    },
})

export const createLeg = createAsyncThunk(
    'leg/create',
    async (createLegDto: ICreateLegDto, thunkAPI) => {
        try {
            const response = await legAPI.createLeg(createLegDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as ILegRejectResponse);
        }
    }
)

export const deleteLeg = createAsyncThunk(
    'leg/delete',
    async (legId: string, thunkAPI) => {
        try {
            const response = await legAPI.deleteLeg(legId);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as ILegRejectResponse);
        }
    }
)

export const getLegs = createAsyncThunk(
    'leg/legs',
    async (none, thunkAPI) => {
        try {
            const response = await legAPI.getLegs();
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as ILegRejectResponse);
        }
    }
)




export const { clearSuccessMessage, clearErrorMessage } = legSlice.actions

export default legSlice.reducer;