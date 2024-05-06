import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { searchOfIdTask } from "../listTasks/ListTasksSlice";

import "./header.scss";
import logo from "../../assets/dve.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const searchIdTask = useSelector((state) => state.tasks.searchIdTask);

  const onSearchOfIdTask = (e) => {
    dispatch(searchOfIdTask(e.target.value));
  };

  return (
    <div className="dve__wrap">
      <div className="dve__logo">
        <img src={logo} alt="logo" />
      </div>
      <main className="dve__main">
        <Link to="/createTask">Создать задачу</Link>
        <input
          type="text"
          placeholder="Поиск по номеру..."
          onChange={onSearchOfIdTask}
          value={searchIdTask}
        />
      </main>
    </div>
  );
};

export default Header;
