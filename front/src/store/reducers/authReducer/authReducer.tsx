import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { IAuthState } from './authReducerTypes';
import { IUser } from '../../../types/types';
import userAPI from '../../../API/userAPI';
// import userAPI from '../../API/userAPI';
// import { ISignUpValues } from '../../components/SignUp/SignUp';
// import { IAuthState, IUser } from '../../types/types';

const initialState: any = {
    user: {
        _id: null,
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        position: null,
    },
    isAuthError: false,
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
        builder.addCase(signIn.fulfilled, (state: IAuthState, action: PayloadAction<any>) => {
            state.user = action.payload
        })
        builder.addCase(signIn.rejected, (state: IAuthState) => {


        })

    },
})

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string, password: string }, thunkAPI) => {
        const response = await userAPI.signIn(email, password);
        return response.data.user;
    }
)


// export const checkAuth = createAsyncThunk(
//     'auth/checkAuth',
//     async (id: string) => {
//         const response = await userAPI.isAuth(id);
//         return response.data.isAuth
//     }
// )

// export const { hideAuthSuccessMessage, clearSignUpErrorMessage, signOut, setUser } = authSlice.actions
export default authSlice.reducer;