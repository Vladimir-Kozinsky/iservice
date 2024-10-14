import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IApu, ICreateApuDto, ICreateEngineDto, IEngine, IGear, ILimit } from '../../../types/types';
import { IGearState } from './gearReducerTypes';
import apuAPI from '../../../API/apuAPI';
import { INewLimitDto } from '../../../components/Iservice/Apus/ApuFile/NewApuLimit/NewApuLimit';
import { IDelApuLimitDto } from '../../../components/Iservice/Apus/ApuFile/DelApuLimit/DelApuLimit';

const initialState: IGearState = {
    choosedGear: {
        _id: '',
        pos: '',
        pn: '',
        sn: '',
        tsn: '',
        csn: '',
        lastInspDate: '',
        tsnAtLastInsp: '',
        csnAtLastInsp: '',
        nextInspDate: '',
        tsnAtNextInsp: '',
        csnAtNextInsp: '',
        gearHistory: []
    },
    gears: [],
    errorMessage: null,
    successMessage: null
}

const gearSlice = createSlice({
    name: 'gear',
    initialState,
    reducers: {
        setChoosedGear(state: IGearState, action: PayloadAction<IGear>) {
            state.choosedGear = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(addApu.fulfilled, (state: IApuState, action: PayloadAction<IApu>) => {
        //     state.choosedApu = action.payload;
        // })
        // builder.addCase(addApu.rejected, (state: IApuState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })
        // builder.addCase(getApus.fulfilled, (state: IApuState, action: PayloadAction<IApu[]>) => {
        //     state.apus = action.payload;
        // })
        // builder.addCase(getApus.rejected, (state: IApuState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })

        // builder.addCase(addLimit.fulfilled, (state: IApuState, action: PayloadAction<ILimit>) => {
            // state.choosedApu.limits.push(action.payload);
            // const apu = state.apus.find((apu: IApu) => apu.msn === state.choosedApu.msn);
            // apu?.limits.push(action.payload);
            // state.successMessage = "New limit successfully added";
        // })
        // builder.addCase(addLimit.rejected, (state: IApuState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })

        // builder.addCase(delLimit.fulfilled, (state: IApuState, action: PayloadAction<string>) => {
            // const limitId = action.payload;
            // const index = state.choosedApu.limits.findIndex((limit: ILimit) => limit._id === limitId);
            // state.choosedApu.limits.splice(index, 1);
            // const apu = state.apus.find((apu: IApu) => apu.msn === state.choosedApu.msn);
            // const indexApuArr = apu?.limits.findIndex((limit: ILimit) => limit._id === limitId);
            // if (apu && (indexApuArr || indexApuArr === 0)) apu.limits.splice(indexApuArr, 1);
        //     // state.successMessage = "Limit successfully removed";
        // })
        // builder.addCase(delLimit.rejected, (state: IApuState, action: PayloadAction<any>) => {
        //     state.errorMessage = action.payload.message;
        // })
    },
})

// export const addApu = createAsyncThunk(
//     'apu/add',
//     async (apuDto: ICreateApuDto, thunkAPI) => {
//         try {
//             const response = await apuAPI.addApu(apuDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as IApuRejectResponse);
//         }
//     }
// )

// export const getGears = createAsyncThunk(
//     'apu/gears',
//     async (none, thunkAPI) => {
//         try {
//             const response = await apuAPI.getApus();
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as IApuRejectResponse);
//         }
//     }
// )

// export const addLimit = createAsyncThunk(
//     'apu/limit/add',
//     async (limitDto: INewLimitDto, thunkAPI) => {
//         try {
//             const response = await apuAPI.addLimit(limitDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as IApuRejectResponse);
//         }

//     }
// )

// export const delLimit = createAsyncThunk(
//     'apu/limit/delete',
//     async (limitDto: IDelApuLimitDto, thunkAPI) => {
//         try {
//             const response = await apuAPI.delLimit(limitDto);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data as IApuRejectResponse);
//         }
//     }
// )

export const { setChoosedGear } = gearSlice.actions

export default gearSlice.reducer;