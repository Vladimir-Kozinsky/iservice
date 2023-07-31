import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import aircraftAPI from '../../../API/aircraftAPI';
import { IAircraftRejectResponse, IAircraftState } from './aircraftReducerTypes';
import { IAircraft, IEngine, ILimit } from '../../../types/types';
import { ICreateAircraftDto } from '../../../components/Iservice/Aircrafts/NewAircraftForm/NewAircraftForm';
import { INewLimitDto } from '../../../components/Iservice/Aircrafts/AircraftFile/NewLimit/NewLimit';
import { IDelLimitDto } from '../../../components/Iservice/Aircrafts/AircraftFile/DelLimit/DelLimit';
import { IInstallEngineDto } from '../../../components/Iservice/Aircrafts/AircraftFile/InstallEngine/InstallEngine';
import { IRemoveEngineDto } from '../../../components/Iservice/Aircrafts/AircraftFile/RemoveEngine/RemoveEngine';

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
    errorMessage: null,
    successMessage: null,
}

const aircraftSlice = createSlice({
    name: 'aircraft',
    initialState,
    reducers: {
        setChoosedAircraft(state: IAircraftState, action: PayloadAction<IAircraft>) {
            state.choosedAircraft = action.payload;
        },
        clearSuccessMessage(state: IAircraftState) {
            state.successMessage = null;
        },

        clearErrorMessage(state: IAircraftState) {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addAircraft.fulfilled, (state: IAircraftState, action: PayloadAction<IAircraft>) => {
            state.choosedAircraft = action.payload;
            state.successMessage = "Aircraft successfully added";
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
        builder.addCase(addLimit.fulfilled, (state: IAircraftState, action: PayloadAction<ILimit>) => {
            state.choosedAircraft.limits.push(action.payload);
            const aircraft = state.aircafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            aircraft?.limits.push(action.payload);
            state.successMessage = "New limit successfully added";
        })
        builder.addCase(addLimit.rejected, (state: any, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(delLimit.fulfilled, (state: IAircraftState, action: PayloadAction<string>) => {
            const limitId = action.payload;
            const index = state.choosedAircraft.limits.findIndex((limit: ILimit) => limit._id === limitId);
            state.choosedAircraft.limits.splice(index, 1);

            const aircraft = state.aircafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            const indexAircraftArr = aircraft?.limits.findIndex((limit: ILimit) => limit._id === limitId);
            if (aircraft && (indexAircraftArr || indexAircraftArr === 0)) aircraft.limits.splice(indexAircraftArr, 1);
            state.successMessage = "Limit successfully removed";
        })
        builder.addCase(delLimit.rejected, (state: any, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(installEngine.fulfilled, (state: IAircraftState, action: PayloadAction<IEngine>) => {
            state.choosedAircraft.engines.push(action.payload);
            const aircraft = state.aircafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            aircraft?.engines.push(action.payload);
            state.successMessage = "Engine successfully installed";
        })
        builder.addCase(installEngine.rejected, (state: any, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(removeEngine.fulfilled, (state: IAircraftState, action: PayloadAction<IEngine>) => {
            const removedEngine = action.payload;
            console.log(removedEngine)
            const choosedAircarftEngineIndex = state.choosedAircraft.engines.findIndex((engine: IEngine) => engine.msn === removedEngine.msn);
            state.choosedAircraft.engines.splice(choosedAircarftEngineIndex, 1);
            const aircraft = state.aircafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            const engineIndexAircraftArr = aircraft?.engines.findIndex((engine: IEngine) => engine.msn === removedEngine.msn);
            if (aircraft && (engineIndexAircraftArr || engineIndexAircraftArr === 0)) aircraft.engines.splice(engineIndexAircraftArr, 1);
            state.successMessage = "Engine successfully removed";
        })

        builder.addCase(removeEngine.rejected, (state: any, action: PayloadAction<any>) => {
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
    async (limitDto: INewLimitDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.addLimit(limitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const delLimit = createAsyncThunk(
    'aircraft/limit/delete',
    async (limitDto: IDelLimitDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.delLimit(limitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const installEngine = createAsyncThunk(
    'aircraft/engine/install',
    async (installEngineDto: IInstallEngineDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.installEngine(installEngineDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const removeEngine = createAsyncThunk(
    'aircraft/engine/remove',
    async (removeEngineDto: IRemoveEngineDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.removeEngine(removeEngineDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const { setChoosedAircraft, clearSuccessMessage, clearErrorMessage } = aircraftSlice.actions

export default aircraftSlice.reducer;