import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { IAuthRejectResponse, IAuthState } from './authReducerTypes';
import userAPI from '../../../API/userAPI';
import { ISignUpValues } from '../../../components/SignUp/SignUp';
import jwt_decode from "jwt-decode";
// import userAPI from '../../API/userAPI';
// import { IAuthState, IUser } from '../../types/types';

const initialState: IAuthState = {
    user: {
        _id: null,
        email: null,
        firstName: null,
        lastName: null,
        position: null,
        role: null,
        isActivated: null
    },
    errorMessage: '',

    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
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
        builder.addCase(signIn.fulfilled, (state: IAuthState, action: PayloadAction<string>) => {
            localStorage.setItem('token', action.payload);
            const decoded = jwt_decode(action.payload) as any;
            delete decoded.exp;
            delete decoded.iat;
            state.user = decoded;
            state.isAuth = true;
            state.errorMessage = '';
        })
        builder.addCase(signIn.rejected, (state: IAuthState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(signUp.fulfilled, (state: IAuthState, action: PayloadAction<string>) => {
            localStorage.setItem('token', action.payload);
            const decoded = jwt_decode(action.payload) as any;
            delete decoded.exp;
            delete decoded.iat;
            state.user = decoded;
            state.isAuth = true;
            state.errorMessage = '';
        })
        builder.addCase(signUp.rejected, (state: IAuthState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(signOut.fulfilled, (state: IAuthState, action: PayloadAction<string>) => {
            state.user = {
                _id: null,
                email: null,
                firstName: null,
                lastName: null,
                position: null,
                role: null,
                isActivated: null
            }
            state.isAuth = false;
            localStorage.removeItem('token');

        })
        builder.addCase(signOut.rejected, (state: IAuthState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })
        builder.addCase(refreshToken.fulfilled, (state: IAuthState, action: PayloadAction<string>) => {
            localStorage.setItem('token', action.payload);
            const decoded = jwt_decode(action.payload) as any;
            delete decoded.exp;
            delete decoded.iat;
            state.user = decoded;
            state.isAuth = true;
            state.errorMessage = '';
        })
        builder.addCase(refreshToken.rejected, (state: IAuthState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

    },
})

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await userAPI.signIn(email, password);
            return response.data.accessToken;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAuthRejectResponse);
        }

    }
)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (candidate: ISignUpValues, thunkAPI) => {
        try {
            const response = await userAPI.signUp(candidate);
            return response.data.accessToken;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IAuthRejectResponse);
        }
    }
)
export const signOut = createAsyncThunk(
    'auth/signOut',
    async (str: undefined, thunkAPI) => {
        try {
            console.log('auth reduser send')
            const response = await userAPI.signOut();
            return response.data.accessToken;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.statusText)
            }
        }
    }
)
export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async (str: undefined, thunkAPI) => {
        try {
            const response = await userAPI.refreshToken();
            return response.data.accessToken;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.statusText)
            }
        }
    }
)


// export const { hideAuthSuccessMessage, clearSignUpErrorMessage, signOut, setUser } = authSlice.actions
export default authSlice.reducer;