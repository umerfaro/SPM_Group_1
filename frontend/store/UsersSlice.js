import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3001/api/users");
  return response.data;
});
// Async thunk to fetch users
export const fetchEquipments = createAsyncThunk("users/fetchEquptments", async () => {
  const response = await axios.get("http://localhost:3001/api/equipments");
  return response.data;
});

const initialState = {
  users: [],
  token: "",
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  roles: "",
  equipment: [],
};


const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEquipment: (state, action) => {
      state.equipment = action.payload;
    },
    resetUserState: () => initialState, // This will reset the user state to initialState

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchEquipments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
      state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setRoles, setToken, setEquipment, resetUserState } = usersSlice.actions;

export default usersSlice.reducer;
