import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEngineRejectResponse, IEngineState } from './engineReducerTypes';
import { ICreateEngineDto, IEngine, ILimit } from '../../../types/types';
import engineAPI from '../../../API/engineAPI';
import { INewLimitDto } from '../../../components/Iservice/Engines/EngineFile/NewEngineLimit/NewEngineLimit';
import { IDelEngineLimitDto } from '../../../components/Iservice/Engines/EngineFile/DelEngineLimit/DelEngineLimit';

const initialState: IEngineState = {
    choosedEngine: {
        _id: null,
        type: null,
        msn: null,
        manuf: null,
        manufDate: null,
        position:null,
        tsn: null,
        csn: null,
        overhaulNum: null,
        lastOverhaulDate: null,
        tsnAtLastOverhaul: null,
        csnAtLastOverhaul: null,
        engineHistory: [],
        limits: [],
    },
    engines: [],
    errorMessage: null,
    successMessage: null
}

const engineSlice = createSlice({
    name: 'engine',
    initialState,
    reducers: {
        setChoosedEngine(state: IEngineState, action: PayloadAction<IEngine>) {
            state.choosedEngine = action.payload;
        },
        clearEngineSuccessMessage(state: IEngineState) {
            state.successMessage = null;
        },

        clearEngineErrorMessage(state: IEngineState) {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addEngine.fulfilled, (state: IEngineState, action: PayloadAction<IEngine>) => {
            state.choosedEngine = action.payload;
        })
        builder.addCase(addEngine.rejected, (state: IEngineState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(getEngines.fulfilled, (state: IEngineState, action: PayloadAction<IEngine[]>) => {
            state.engines = action.payload;
        })
        builder.addCase(getEngines.rejected, (state: IEngineState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(addLimit.fulfilled, (state: IEngineState, action: PayloadAction<ILimit>) => {
            // state.choosedEngine.limits.push(action.payload);
            // const engine = state.engines.find((engine: IEngine) => engine.msn === state.choosedEngine.msn);
            // engine?.limits.push(action.payload);
            // state.successMessage = "New limit successfully added";
        })
        builder.addCase(addLimit.rejected, (state: IEngineState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(delLimit.fulfilled, (state: IEngineState, action: PayloadAction<string>) => {
            // const limitId = action.payload;
            // const index = state.choosedEngine.limits.findIndex((limit: ILimit) => limit._id === limitId);
            // state.choosedEngine.limits.splice(index, 1);

            // const engine = state.engines.find((aircraft: IEngine) => aircraft.msn === state.choosedEngine.msn);
            // const indexEngineArr = engine?.limits.findIndex((limit: ILimit) => limit._id === limitId);
            // if (engine && (indexEngineArr || indexEngineArr === 0)) engine.limits.splice(indexEngineArr, 1);
            // state.successMessage = "Limit successfully removed";
        })
        builder.addCase(delLimit.rejected, (state: IEngineState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
    },
})

export const addEngine = createAsyncThunk(
    'engine/add',
    async (engineDto: ICreateEngineDto, thunkAPI) => {
        try {
            const response = await engineAPI.addEngine(engineDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IEngineRejectResponse);
        }
    }
)

export const getEngines = createAsyncThunk(
    'engine/engines',
    async (none, thunkAPI) => {
        try {
            const response = await engineAPI.getEngines();
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IEngineRejectResponse);
        }
    }
)

export const addLimit = createAsyncThunk(
    'engine/limit/add',
    async (limitDto: INewLimitDto, thunkAPI) => {
        try {
            const response = await engineAPI.addLimit(limitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IEngineRejectResponse);
        }

    }
)

export const delLimit = createAsyncThunk(
    'engine/limit/delete',
    async (limitDto: IDelEngineLimitDto, thunkAPI) => {
        try {
            const response = await engineAPI.delLimit(limitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IEngineRejectResponse);
        }

    }
)

export const { setChoosedEngine, clearEngineSuccessMessage, clearEngineErrorMessage } = engineSlice.actions

export default engineSlice.reducer;