import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import aircraftAPI from '../../../API/aircraftAPI';
import { IAircraftRejectResponse, IAircraftState } from './aircraftReducerTypes';
import { IAircraft } from '../../../types/types';
import { ICreateAircraftDto } from '../../../components/Iservice/Aircrafts/NewAircraftForm/NewAircraftForm';
import { INewLimitDto } from '../../../components/Iservice/Aircrafts/AircraftFile/NewLimit/NewLimit';

const initialState: IAircraftState = {
    choosedAircraft: {
        _id: null,
        type: null,
        msn: null,
        regNum: null,
        manufDate: null,
        initFh: null,
        initFc: null,
        fh: null,
        fc: null,
        overhaulNum: null,
        lastOverhaulDate: null,
        tsnAtLastOverhaul: null,
        csnAtLastOverhaul: null,
        engines: [],
        apu: [],
        legs: [],
        limits: []
    },
    aircafts: [],
    errorMessage: null
}

const aircraftSlice = createSlice({
    name: 'aircraft',
    initialState,
    reducers: {
        setChoosedAircraft(state: IAircraftState, action: PayloadAction<IAircraft>) {
            state.choosedAircraft = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addAircraft.fulfilled, (state: IAircraftState, action: PayloadAction<IAircraft>) => {
            state.choosedAircraft = action.payload;
        })
        builder.addCase(addAircraft.rejected, (state: any, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(getAircrafts.fulfilled, (state: IAircraftState, action: PayloadAction<IAircraft[]>) => {
            state.aircafts = action.payload;
        })
        builder.addCase(getAircrafts.rejected, (state: any, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(addLimit.fulfilled, (state: IAircraftState, action: PayloadAction<any>) => {
            state.choosedAircraft.limits.push(action.payload);
        })
        builder.addCase(addLimit.rejected, (state: any, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })


    },
})

export const addAircraft = createAsyncThunk(
    'aircraft/add',
    async (aircraftDto: ICreateAircraftDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.addAircraft(aircraftDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)
export const getAircrafts = createAsyncThunk(
    'aircraft/aircrafts',
    async (none, thunkAPI) => {
        try {
            const response = await aircraftAPI.getAircrafts();
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const addLimit = createAsyncThunk(
    'aircraft/limit/add',
    async (limitDto:INewLimitDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.addLimit(limitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const { setChoosedAircraft } = aircraftSlice.actions

export default aircraftSlice.reducer;