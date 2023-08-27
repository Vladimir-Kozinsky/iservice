import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IApu, ICreateApuDto, ICreateEngineDto, IEngine, ILimit } from '../../../types/types';
import { IApuRejectResponse, IApuState } from './apuReducerTypes';
import apuAPI from '../../../API/apuAPI';
import { INewLimitDto } from '../../../components/Iservice/Apus/ApuFile/NewApuLimit/NewApuLimit';

const initialState: IApuState = {
    choosedApu: {
        _id: '',
        type: '',
        msn: '',
        manufDate: '',
        tsn: '',
        csn: '',
        overhaulNum: 0,
        lastOverhaulDate: '',
        tsnAtLastOverhaul: '',
        csnAtLastOverhaul: '',
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

        builder.addCase(addLimit.fulfilled, (state: IApuState, action: PayloadAction<ILimit>) => {
            state.choosedApu.limits.push(action.payload);
            const apu = state.apus.find((apu: IApu) => apu.msn === state.choosedApu.msn);
            apu?.limits.push(action.payload);
            state.successMessage = "New limit successfully added";
        })
        builder.addCase(addLimit.rejected, (state: IApuState, action: PayloadAction<any>) => {
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

export const addLimit = createAsyncThunk(
    'apu/limit/add',
    async (limitDto: INewLimitDto, thunkAPI) => {
        try {
            const response = await apuAPI.addLimit(limitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IApuRejectResponse);
        }

    }
)

export const { setChoosedApu } = apuSlice.actions

export default apuSlice.reducer;