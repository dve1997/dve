import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

export const tasksAdapter = createEntityAdapter();
const initialState = tasksAdapter.getInitialState({
  statusLoadingTasks: "idle",
  statusLoadingCreateTask: "idle",
  statusLoadingInfoTask: "idle",
  statusLoadingUpdateTask: "idle",
  statusLoadingDeleteTask: "idle",
  task: "",
  searchIdTask: "",
  filterStatusTask: "",
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/tasks");
});

export const fetchCreateTask = createAsyncThunk(
  "tasks/fetchCreateTask",
  async (body) => {
    const { request } = useHttp();
    return await request("http://localhost:3001/tasks", "POST", body);
  }
);

export const fetchInfoTask = createAsyncThunk(
  "tasks/fetchInfoTask",
  async (idTask) => {
    const { request } = useHttp();
    return await request("http://localhost:3001/tasks/" + `${idTask}`);
  }
);

export const fetchUpdateTask = createAsyncThunk(
  "tasks/fetchUpdateTask",
  async (body) => {
    const bodyStringify = JSON.stringify(body);
    const { request } = useHttp();
    return await request(
      "http://localhost:3001/tasks/" + `${body.id}`,
      "PATCH",
      bodyStringify
    );
  }
);

export const fetchDeleteTask = createAsyncThunk(
  "tasks/fetchDeleteTask",
  async (idTask) => {
    const { request } = useHttp();
    return await request(
      "http://localhost:3001/tasks/" + `${idTask}`,
      "DELETE"
    );
  }
);

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    searchOfIdTask: (state, action) => {
      state.searchIdTask = action.payload;
    },
    filterOfStatusTask: (state, action) => {
      state.filterStatusTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.statusLoadingTasks = "idle";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.statusLoadingTasks = "loaded";
        tasksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.statusLoadingTasks = "error";
      })
      .addCase(fetchCreateTask.pending, (state) => {
        state.statusLoadingCreateTask = "idle";
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        state.statusLoadingCreateTask = "loaded";
        tasksAdapter.addOne(state, action.payload);
      })
      .addCase(fetchCreateTask.rejected, (state) => {
        state.statusLoadingCreateTask = "error";
      })
      .addCase(fetchInfoTask.pending, (state) => {
        state.statusLoadingInfoTask = "idle";
      })
      .addCase(fetchInfoTask.fulfilled, (state, action) => {
        state.statusLoadingInfoTask = "loaded";
        state.task = action.payload;
      })
      .addCase(fetchInfoTask.rejected, (state) => {
        state.statusLoadingInfoTask = "error";
      })
      .addCase(fetchUpdateTask.pending, (state) => {
        state.statusLoadingUpdateTask = "idle";
      })
      .addCase(fetchUpdateTask.fulfilled, (state, action) => {
        state.statusLoadingUpdateTask = "loaded";
        state.task = action.payload;
        tasksAdapter.updateOne(state, action.payload);
      })
      .addCase(fetchUpdateTask.rejected, (state) => {
        state.statusLoadingUpdateTask = "error";
      })
      .addCase(fetchDeleteTask.pending, (state) => {
        state.statusLoadingDeleteTask = "idle";
      })
      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        state.statusLoadingDeleteTask = "loaded";
        tasksAdapter.removeOne(state, action.payload);
      })
      .addCase(fetchDeleteTask.rejected, (state) => {
        state.statusLoadingDeleteTask = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = tasks;
export const { searchOfIdTask, filterOfStatusTask } = actions;
export default reducer;
