import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import aircraftAPI from '../../../API/aircraftAPI';
import { IAircraftRejectResponse, IAircraftState } from './aircraftReducerTypes';
import { IAircraft, IApu, IEngine, IGear, ILg, ILimit } from '../../../types/types';
import { ICreateAircraftDto } from '../../../components/Iservice/Aircrafts/NewAircraftForm/NewAircraftForm';
import { INewLimitDto } from '../../../components/Iservice/Aircrafts/AircraftFile/NewLimit/NewLimit';
import { IDelLimitDto } from '../../../components/Iservice/Aircrafts/AircraftFile/DelLimit/DelLimit';
import { IInstallEngineDto } from '../../../components/Iservice/Aircrafts/AircraftFile/InstallEngine/InstallEngine';
import { IRemoveEngineDto } from '../../../components/Iservice/Aircrafts/AircraftFile/RemoveEngine/RemoveEngine';
import { IInstallApuDto } from '../../../components/Iservice/Aircrafts/AircraftFile/InstallApu/InstallApu';
import { IRemoveApuDto } from '../../../components/Iservice/Aircrafts/AircraftFile/RemoveApu/RemoveApu';
import engineAPI from '../../../API/engineAPI';
import { IInstallGearDto } from '../../../components/Iservice/Aircrafts/AircraftFile/InstallGear/InstallGear';
import { IRemoveGearDto } from '../../../components/Iservice/Aircrafts/AircraftFile/RemoveGear/RemoveGear';
import gearAPI from '../../../API/gearAPI';


interface IUpdateFhFcDto {
    fh: string;
    fc: string;
}

const initialState: IAircraftState = {
    choosedAircraft: {
        _id: '',
        type: '',
        msn: '',
        regNum: '',
        manufDate: '',
        typeCert: '',
        code: '',
        mtow: '',
        mzfw: '',
        mlw: '',
        mtw: '',
        fuelCap: '',
        bew: '',
        cg: '',
        initFh: '',
        initFc: '',
        fh: '',
        fc: '',
        overhaulNum: 0,
        lastOverhaulDate: '',
        tsnAtLastOverhaul: '',
        csnAtLastOverhaul: '',
        engines: [],
        apu: {},
        legs: [],
        limits: [],
        lgs: []
    },
    installedEngines: [],
    installedGears: [],
    aircrafts: [],
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
        },

        updateFhFc(state: IAircraftState, action: PayloadAction<IUpdateFhFcDto>) {
            state.choosedAircraft.fh = action.payload.fh
            state.choosedAircraft.fc = action.payload.fc
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addAircraft.fulfilled, (state: IAircraftState, action: PayloadAction<IAircraft>) => {
            state.choosedAircraft = action.payload;
            state.successMessage = "Aircraft successfully added";
        })
        builder.addCase(addAircraft.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(getAircrafts.fulfilled, (state: IAircraftState, action: PayloadAction<IAircraft[]>) => {
            state.aircrafts = action.payload;
        })
        builder.addCase(getAircrafts.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(getEngine.fulfilled, (state: IAircraftState, action: PayloadAction<IEngine>) => {
            const engine = action.payload;
            const engineIndex = state.installedEngines.findIndex((eng: IEngine) => eng.msn === engine.msn);
            if (engineIndex === 0 || engineIndex > 0) {
                state.installedEngines[engineIndex] = engine;
            } else {
                state.installedEngines.push(engine);
            }
        })
        builder.addCase(getEngine.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(getGear.fulfilled, (state: IAircraftState, action: PayloadAction<IGear>) => {
            const gear = action.payload;
            const gearIndex = state.installedGears.findIndex((g: IGear) => g.sn === gear.sn);
            if (gearIndex === 0 || gearIndex > 0) {
                state.installedGears[gearIndex] = gear;
            } else {
                state.installedGears.push(gear);
            }
        })
        builder.addCase(getGear.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(addLimit.fulfilled, (state: IAircraftState, action: PayloadAction<IAircraft>) => {
            state.choosedAircraft = action.payload;
            const aircraftIndex = state.aircrafts.findIndex((aircraft: IAircraft) => aircraft._id === action.payload._id);
            state.aircrafts.splice(aircraftIndex, 1);
            state.successMessage = "New limit successfully added";
        })
        builder.addCase(addLimit.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(installGear.fulfilled, (state: IAircraftState, action: PayloadAction<IGear>) => {
            if (action.payload._id) {
                state.choosedAircraft.lgs.push(action.payload._id);
                state.installedGears.push(action.payload);
            }

            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            aircraft?.lgs.push(action.payload._id);
            state.successMessage = "New LG successfully added";
        })
        builder.addCase(installGear.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(removeGear.fulfilled, (state: IAircraftState, action: PayloadAction<IGear>) => {
            const removedGear = action.payload;
            const choosedAircarftGearIndex = state.choosedAircraft.lgs.findIndex((gearId: string) => gearId === removedGear._id);
            state.choosedAircraft.lgs.splice(choosedAircarftGearIndex, 1);

            const installedGearsIndex = state.installedGears.findIndex((gear: IGear) => gear._id === removedGear._id);
            state.installedGears.splice(installedGearsIndex, 1);

            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            const gearIndexAircraftArr = aircraft?.lgs.findIndex((gearId: string) => gearId === removedGear._id);
            if (aircraft && (gearIndexAircraftArr === 0)) aircraft.lgs.splice(gearIndexAircraftArr, 1);
            state.successMessage = "Gear successfully removed";
        })



        builder.addCase(delLimit.fulfilled, (state: IAircraftState, action: PayloadAction<string>) => {
            const limitId = action.payload;
            const index = state.choosedAircraft.limits.findIndex((limit: ILimit) => limit._id === limitId);
            state.choosedAircraft.limits.splice(index, 1);

            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            const indexAircraftArr = aircraft?.limits.findIndex((limit: ILimit) => limit._id === limitId);
            if (aircraft && (indexAircraftArr || indexAircraftArr === 0)) aircraft.limits.splice(indexAircraftArr, 1);
            state.successMessage = "Limit successfully removed";
        })
        builder.addCase(delLimit.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(installEngine.fulfilled, (state: IAircraftState, action: PayloadAction<IEngine>) => {
            if (action.payload._id) {
                state.choosedAircraft.engines.push(action.payload._id);
                state.installedEngines.push(action.payload);
            }
            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            if (action.payload._id) {
                aircraft?.engines.push(action.payload._id);
                state.successMessage = "Engine successfully installed";
            }
        })
        builder.addCase(installEngine.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(removeEngine.fulfilled, (state: IAircraftState, action: PayloadAction<IEngine>) => {
            const removedEngine = action.payload;
            const choosedAircarftEngineIndex = state.choosedAircraft.engines.findIndex((engineId: string) => engineId === removedEngine._id);
            state.choosedAircraft.engines.splice(choosedAircarftEngineIndex, 1);
            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            const engineIndexAircraftArr = aircraft?.engines.findIndex((engineId: string) => engineId === removedEngine._id);
            if (aircraft && (engineIndexAircraftArr || engineIndexAircraftArr === 0)) aircraft.engines.splice(engineIndexAircraftArr, 1);
            state.successMessage = "Engine successfully removed";
        })

        builder.addCase(removeEngine.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(installApu.fulfilled, (state: IAircraftState, action: PayloadAction<IApu>) => {
            state.choosedAircraft.apu = action.payload;
            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            if (aircraft) aircraft.apu = action.payload;
            state.successMessage = "APU successfully installed";
        })
        builder.addCase(installApu.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(removeApu.fulfilled, (state: IAircraftState, action: PayloadAction<IApu>) => {
            state.choosedAircraft.apu = {};
            const aircraft = state.aircrafts.find((aircraft: IAircraft) => aircraft.msn === state.choosedAircraft.msn);
            if (aircraft) aircraft.apu = {};
            state.successMessage = "APU successfully removed";
        })

        builder.addCase(removeApu.rejected, (state: IAircraftState, action: PayloadAction<any>) => {
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

export const getEngine = createAsyncThunk(
    'aircraft/engine',
    async (engineId: string, thunkAPI) => {
        try {
            const response = await engineAPI.getEngine(engineId);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)


export const getGear = createAsyncThunk(
    'aircraft/gear',
    async (gearId: string, thunkAPI) => {
        try {
            const response = await gearAPI.getGear(gearId);
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

export const installApu = createAsyncThunk(
    'aircraft/apu/install',
    async (installApuDto: IInstallApuDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.installApu(installApuDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const removeApu = createAsyncThunk(
    'aircraft/apu/remove',
    async (removeApuDto: IRemoveApuDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.removeApu(removeApuDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const installGear = createAsyncThunk(
    'aircraft/gear/install',
    async (installGearDto: IInstallGearDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.installGear(installGearDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }
    }
)

export const removeGear = createAsyncThunk(
    'aircraft/gear/remove',
    async (removeGearDto: IRemoveGearDto, thunkAPI) => {
        try {
            const response = await aircraftAPI.removeGear(removeGearDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAircraftRejectResponse);
        }

    }
)

export const { setChoosedAircraft, clearSuccessMessage, clearErrorMessage, updateFhFc } = aircraftSlice.actions

export default aircraftSlice.reducer;