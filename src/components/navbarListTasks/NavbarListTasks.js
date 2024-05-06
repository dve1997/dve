import { useDispatch } from "react-redux";

import { filterOfStatusTask } from "../listTasks/ListTasksSlice";

import "./navbarListTasks.scss";

const NavbarListTasks = () => {
  const dispatch = useDispatch();

  const onFilterOfStatusTask = (e) => {
    dispatch(filterOfStatusTask(e.target.textContent));
  };

  return (
    <div className="dve__navtasks">
      <div className="dve__btn" onClick={onFilterOfStatusTask}>
        Назначена
      </div>
      <div className="dve__btn" onClick={onFilterOfStatusTask}>
        Открыта
      </div>
      <div className="dve__btn" onClick={onFilterOfStatusTask}>
        Закрыта
      </div>
    </div>
  );
};

export default NavbarListTasks;
