import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

export const responsibleEmployeesAdapter = createEntityAdapter();
const initialState = responsibleEmployeesAdapter.getInitialState({
  statusLoadingResponsibleEmployees: "idle",
});

export const fetchResponsibleEmployees = createAsyncThunk(
  "responsibleemployees/fetchResponsibleEmployees",
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/responsibleemployees");
  }
);

const responsibleEmployees = createSlice({
  name: "responsibleemployees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponsibleEmployees.pending, (state) => {
        state.statusLoadingResponsibleEmployees = "idle";
      })
      .addCase(fetchResponsibleEmployees.fulfilled, (state, action) => {
        state.statusLoadingResponsibleEmployees = "loaded";
        responsibleEmployeesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchResponsibleEmployees.rejected, (state) => {
        state.statusLoadingResponsibleEmployees = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = responsibleEmployees;
// export const {} = actions;
export default reducer;
