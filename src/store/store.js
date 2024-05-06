import { configureStore } from "@reduxjs/toolkit";

import tasks from "../components/listTasks/ListTasksSlice";
import responsibleEmployees from "../components/createTask/CreateTaskSlice";

const store = configureStore({
  reducer: { tasks, responsibleEmployees },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
