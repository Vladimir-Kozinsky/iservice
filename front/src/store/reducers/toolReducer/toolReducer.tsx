import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITool } from '../../../types/types';
import storeAPI from '../../../API/storeAPI';
import { IChangeTooltDto, ICreateToolDto, IDeleteToolDto, IGetPrintToolsDto, IGetToolsDto, IGetToolsResponseDto, IToolRejectResponse, IToolState } from './toolReducerTypes';
import { IUsageUnitDto } from '../storeReducer/storeReducerTypes';
import toolAPI from '../../../API/toolAPI';

const initialState: IToolState = {
    choosedTool: {
        _id: null,
        pn: null,
        sn: null,
        type: null,
        desc: null,
        quantity: null,
        location: null,
        rack: null,
        shelf: null,
        calibration: null,
        remarks: null,
    },
    tools: [],
    toolsToPrint: [],
    totalPages: null,
    currentPage: null,
    errorMessage: null,
    successMessage: null,
}

const toolSlice = createSlice({
    name: 'tool',
    initialState,
    reducers: {

        clearToolSuccessMessage(state: IToolState) {
            state.successMessage = null;
        },

        clearToolErrorMessage(state: IToolState) {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTool.fulfilled, (state: IToolState, action: PayloadAction<ITool>) => {
            state.tools.push(action.payload);
            state.successMessage = "Tool successfully added";
        })
        builder.addCase(createTool.rejected, (state: IToolState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(changeTool.fulfilled, (state: IToolState, action: PayloadAction<ITool>) => {
            const changedUnitIndex = state.tools.findIndex((unit: ITool) => unit._id === action.payload._id)
            state.tools[changedUnitIndex] = action.payload;
            state.successMessage = "Tool successfully updated";
        })
        builder.addCase(changeTool.rejected, (state: IToolState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(deleteTool.fulfilled, (state: IToolState, action: PayloadAction<ITool>) => {
            const deletedUnitIndex = state.tools.findIndex((unit: ITool) => unit.sn === action.payload.sn)
            state.tools.splice(deletedUnitIndex, 1);
            state.successMessage = "Tool successfully deleted";
        })
        builder.addCase(deleteTool.rejected, (state: IToolState, action: PayloadAction<any>) => {
            state.errorMessage = action.payload.message;
        })

        builder.addCase(getTools.fulfilled, (state: IToolState, action: PayloadAction<IGetToolsResponseDto>) => {
            state.tools = action.payload.tools;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        })
        builder.addCase(getTools.rejected, (state: IToolState, action: PayloadAction<any>) => {
            //state.errorMessage = action.payload.message;
            state.tools = [];
        })

        builder.addCase(getPrintTools.fulfilled, (state: IToolState, action: PayloadAction<ITool[]>) => {
            state.toolsToPrint = action.payload;
        })
        builder.addCase(getPrintTools.rejected, (state: IToolState, action: PayloadAction<any>) => {
            //state.errorMessage = action.payload.message;
            state.toolsToPrint = [];
        })
    },
})

export const createTool = createAsyncThunk(
    'tool/create',
    async (createLegDto: ICreateToolDto, thunkAPI) => {
        try {
            const response = await toolAPI.create(createLegDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
        }
    }
)

export const changeTool = createAsyncThunk(
    'tool/edit',
    async (editUnitDto: IChangeTooltDto, thunkAPI) => {
        try {
            const response = await toolAPI.editTool(editUnitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
        }
    }
)

export const deleteTool = createAsyncThunk(
    'tool/delete',
    async (deleteUnitDto: IDeleteToolDto, thunkAPI) => {
        try {
            const response = await toolAPI.deleteTool(deleteUnitDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
        }
    }
)

export const getTools = createAsyncThunk(
    'tool/tools',
    async (getUnitsDto: IGetToolsDto, thunkAPI) => {
        try {
            const response = await toolAPI.getTools(getUnitsDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
        }
    }
)

export const getPrintTools = createAsyncThunk(
    'tool/print',
    async (getPrintUnitsDto: IGetPrintToolsDto, thunkAPI) => {
        try {
            const response = await toolAPI.getPrintTools(getPrintUnitsDto);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data as IToolRejectResponse);
        }
    }
)




export const { clearToolSuccessMessage, clearToolErrorMessage } = toolSlice.actions

export default toolSlice.reducer;