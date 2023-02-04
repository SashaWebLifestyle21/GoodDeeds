import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {text} from "stream/consumers";

export interface IDeed {
    text: string
    _id: string
}

export interface IUser {
    name: string
    email: string
    password: string,
    nickname: string
    _id: string,
    deeds: IDeed[],
    friends: IUser[]
}

interface IDataRegister {
    email: string
    password: string
    name: string
    nickname: string
}

interface IDataLogin {
    email: string
    password: string
}

interface IDataUpdate {
    _id: string
    name: string
    email: string
    password: string,
    nickname: string
}

interface IDataAddDeed {
    deed: {
        text: string
    },
    userId: string
}

interface IDataDeleteDeed {
    id: string
    userId: string
}

interface IDataUpdateDeed {
    deed: {
        id: string
        text: string
    }
    userId: string
}

interface IDataAddFriend {
    nickname: string
    id: string
}

interface IUserState {
    currentUser: IUser
    isLoading: boolean
    token: string
    status: string | null
}

const initialState: IUserState = {
    currentUser: {
        name: '',
        nickname: '',
        email: '',
        password: '',
        _id: '',
        deeds: [],
        friends: []
    },
    token: '',
    isLoading: false,
    status: null

}

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ email, password, name, nickname, }: IDataRegister, thunkAPI) => {
        try {
            const {data} = await axios.post('http://localhost:5000/auth/registration', {
                name,
                email,
                password,
                nickname
            })

            if(data.token){
                window.localStorage.setItem('userToken', data.token)
            }
            return data
        } catch (e: any) {
            return e.response.data
        }
    })

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }: IDataLogin, thunkAPI) => {
        try {
            const {data} = await axios.post('http://localhost:5000/auth/login', {
                email,
                password
            })

            if(data.token){
                window.localStorage.setItem('userToken', data.token)
            }

            return data
        } catch (e: any) {
            return e.response.data
        }
    })

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ email, password, nickname, name, _id }: IDataUpdate, thunkAPI) => {
        try {
            const {data} = await axios.put('http://localhost:5000/users', {
                email,
                password,
                nickname,
                name,
                _id
            })
            return data
        } catch (e: any) {
            return e.response.data
        }
    })

export const addDeed = createAsyncThunk(
    'user/addDeed',
    async (deed: IDataAddDeed, thunkAPI) => {
        try {
            const {data} = await axios.post('http://localhost:5000/deeds', deed)
            return data
        } catch (e: any) {
            return e.response.data
        }
    })

export const removeDeed = createAsyncThunk(
    'user/removeDeed',
    async ({userId, id}: IDataDeleteDeed, thunkAPI) => {
        try {
            const {data} = await axios.delete(`http://localhost:5000/deeds/${id}/${userId}`)
            return data
        } catch (e: any) {
            return e.response.data
        }
    })

export const updateDeed = createAsyncThunk(
    'user/updateDeed',
    async ({userId, deed}: IDataUpdateDeed, thunkAPI) => {
        try {
            const {data} = await axios.put(`http://localhost:5000/deeds`, {deed, userId})
            return data
        } catch (e: any) {
            return e.response.data
        }
    })


export const addFriend = createAsyncThunk(
    'user/addFriend',
    async (friend: IDataAddFriend, thunkAPI) => {
        try {
            const {data} = await axios.post('http://localhost:5000/users/addFriend', friend)
            return data
        } catch (e: any) {
            return e.response.data
        }
    })

export const getFriends = createAsyncThunk(
    'user/getFriends',
    async (id: string, thunkAPI) => {
        try {
            const {data} = await axios.get(`http://localhost:5000/users/${id}`)
            return data
        } catch (e: any) {
            return e.response.data
        }
    })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = {
                name: '',
                nickname: '',
                email: '',
                password: '',
                _id: '',
                deeds: [],
                friends: []
            }
            state.isLoading = false
            state.status = null
            state.token = ''
        }
    },
    extraReducers: {
        // Register user
        [registerUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload.user
            state.token = action.payload.token
            state.status = action.payload?.message
        },
        [registerUser.rejected.type]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },
        [loginUser.pending.type]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.currentUser = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        [updateUser.pending.type]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [updateUser.fulfilled.type]: (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        },
        [updateUser.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        [addDeed.pending.type]: (state) => {
            state.isLoading = true
        },
        [addDeed.fulfilled.type]: (state, action) => {
            state.currentUser.deeds.push(action.payload)
        },
        [addDeed.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        [removeDeed.pending.type]: (state) => {
            state.isLoading = true
        },
        [removeDeed.fulfilled.type]: (state, action) => {
            state.currentUser.deeds = state.currentUser.deeds.filter(deed => deed._id !== action.payload)
        },
        [removeDeed.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        [updateDeed.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateDeed.fulfilled.type]: (state, action) => {
            state.currentUser.deeds = state.currentUser.deeds.map(deed => {
                if(deed._id === action.payload._id) {
                    return {...deed, text: action.payload.text}
                }
                return deed
            })
        },
        [updateDeed.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        [addFriend.pending.type]: (state) => {
            state.isLoading = true
        },
        [addFriend.fulfilled.type]: (state, action) => {
            state.currentUser.friends.push(action.payload)
        },
        [addFriend.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
        [getFriends.pending.type]: (state) => {
            state.isLoading = true
        },
        [getFriends.fulfilled.type]: (state, action) => {
            state.currentUser.friends = action.payload
        },
        [getFriends.rejected.type]: (state, action) => {
            state.status = action.payload
            state.isLoading = false
        },
    }
})

export default userSlice.reducer
export const { logout } = userSlice.actions