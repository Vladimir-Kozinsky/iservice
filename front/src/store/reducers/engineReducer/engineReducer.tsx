import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEngineRejectResponse, IEngineState } from './engineReducerTypes';
import { ICreateEngineDto, IEngine, ILimit } from '../../../types/types';
import engineAPI from '../../../API/engineAPI';
import { INewLimitDto } from '../../../components/Iservice/Engines/EngineFile/NewEngineLimit/NewEngineLimit';

const initialState: IEngineState = {
    choosedEngine: {
        _id: null,
        type: null,
        msn: null,
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
            state.choosedEngine.limits.push(action.payload);
            const engine = state.engines.find((engine: IEngine) => engine.msn === state.choosedEngine.msn);
            engine?.limits.push(action.payload);
            state.successMessage = "New limit successfully added";
        })
        builder.addCase(addLimit.rejected, (state: any, action: PayloadAction<any>) => {
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
    'aircraft/limit/add',
    async (limitDto: INewLimitDto, thunkAPI) => {
        try {
            const response = await engineAPI.addLimit(limitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IEngineRejectResponse);
        }

    }
)

export const { setChoosedEngine } = engineSlice.actions

export default engineSlice.reducer;