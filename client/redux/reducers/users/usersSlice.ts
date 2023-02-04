import {IUser, registerUser} from "@/redux/reducers/user/userSlice";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface IUsersState {
    users: IUser[]
    isLoading: boolean
}


const initialState: IUsersState = {
    users: [],
    isLoading: false
}

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/users')
            return data
        } catch (e: any) {
            return e.response.data
        }
        }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllUsers.pending.type]: (state) => {
            state.isLoading = true
        },
        [getAllUsers.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.users = action.payload
        },
        [getAllUsers.rejected.type]: (state, action) => {
            state.isLoading = false
        },
    }
})
export default usersSlice.reducer