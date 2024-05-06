import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../header/Header";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import ListTasksPage from "../../pages/listTasksPage/ListTasksPage";
import InfoTaskPage from "../../pages/infoTaskPage/InfoTaskPage";
import CreateTaskPage from "../../pages/createTaskPage/CreateTaskPage";

import "./app.scss";

function App() {
  return (
    <>
      <Router basename="/dve">
        <header className="dve__header">
          <Header />
        </header>
        <div className="dve__conteiner">
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <ListTasksPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/infoTask/:idTask"
              element={
                <ErrorBoundary>
                  <InfoTaskPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/createTask"
              element={
                <ErrorBoundary>
                  <CreateTaskPage />
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
