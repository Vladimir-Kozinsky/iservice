import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { ICreateAircraftDto } from '../../../components/Iservice/Dashboard/NewAircraftForm/NewAircraftForm';
import aircraftAPI from '../../../API/aircraftAPI';
import { IAircraftRejectResponse, IAircraftState } from './aircraftReducerTypes';

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
        // hideAuthSuccessMessage(state: IAuthState) {
        //     state.isSuccessMessage = false;
        // },
        // clearSignUpErrorMessage(state: IAuthState) {
        //     state.signUpErrorMessage = '';
        //     state.isSignUpError = false;
        // },
        // signOut(state: IAuthState) {
        //     state.isAuth = false;
        //     state.user = {
        //         _id: null,
        //         email: null,
        //         password: null,
        //         firstName: null,
        //         lastName: null,
        //         position: null,
        //     }
        //     window.localStorage.removeItem("user-id");
        //     window.localStorage.removeItem("user-email");
        //     window.localStorage.removeItem("user-firstName");
        //     window.localStorage.removeItem("user-lastName");
        //     window.localStorage.removeItem("user-position");
        // },
        // setUser(state: IAuthState) {
        //     const userId: string | null = window.localStorage.getItem("user-id");
        //     if (userId?.length) state.user._id = userId;
        //     const email: string | null = window.localStorage.getItem("user-email");
        //     if (email?.length) state.user.email = email;
        //     const firstName: string | null = window.localStorage.getItem("user-firstName");
        //     if (firstName?.length) state.user.firstName = firstName;
        //     const lastName: string | null = window.localStorage.getItem("user-lastName");
        //     if (lastName?.length) state.user.lastName = lastName;
        //     const position: string | null = window.localStorage.getItem("user-position");
        //     if (position?.length) state.user.position = position;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(addAircraft.fulfilled, (state: IAircraftState, action: PayloadAction<any>) => {
            state.choosedAircraft = action.payload;
        })
        builder.addCase(addAircraft.rejected, (state: any, action: PayloadAction<any>) => {
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

// export const { hideAuthSuccessMessage, clearSignUpErrorMessage, signOut, setUser } = authSlice.actions
export default aircraftSlice.reducer;