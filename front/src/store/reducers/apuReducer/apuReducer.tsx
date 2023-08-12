import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IApu, ICreateApuDto, ICreateEngineDto, IEngine } from '../../../types/types';
import engineAPI from '../../../API/engineAPI';
import { IApuRejectResponse, IApuState } from './apuReducerTypes';
import apuAPI from '../../../API/apuAPI';

const initialState: IApuState = {
    choosedApu: {
        _id: null,
        type: null,
        msn: null,
        manufDate: null,
        tsn: null,
        csn: null,
        overhaulNum: null,
        lastOverhaulDate: null,
        tsnAtLastOverhaul: null,
        csnAtLastOverhaul: null,
        apuHistory: [],
        limits: [],
    },
    apus: [],
    errorMessage: null,
    successMessage: null
}

const apuSlice = createSlice({
    name: 'apu',
    initialState,
    reducers: {
        setChoosedApu(state: IApuState, action: PayloadAction<IApu>) {
            state.choosedApu = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addApu.fulfilled, (state: IApuState, action: PayloadAction<IApu>) => {
            state.choosedApu = action.payload;
        })
        builder.addCase(addApu.rejected, (state: IApuState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(getApus.fulfilled, (state: IApuState, action: PayloadAction<IApu[]>) => {
            state.apus = action.payload;
        })
        builder.addCase(getApus.rejected, (state: IApuState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
    },
})

export const addApu = createAsyncThunk(
    'apu/add',
    async (apuDto: ICreateApuDto, thunkAPI) => {
        try {
            const response = await apuAPI.addApu(apuDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IApuRejectResponse);
        }
    }
)

export const getApus = createAsyncThunk(
    'apu/apus',
    async (none, thunkAPI) => {
        try {
            const response = await apuAPI.getApus();
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IApuRejectResponse);
        }
    }
)

export const { setChoosedApu } = apuSlice.actions

export default apuSlice.reducer;