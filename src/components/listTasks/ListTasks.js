import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { tasksAdapter, fetchTasks } from "./ListTasksSlice";
import store from "../../store/store";
import Spinner from "../spinner/Spinner";

import "./listTasks.scss";

const ListTasks = () => {
  const dispatch = useDispatch();
  const statusLoadingTasks = useSelector(
    (state) => state.tasks.statusLoadingTasks
  );
  const searchIdTask = useSelector((state) => state.tasks.searchIdTask);
  const filterStatusTask = useSelector((state) => state.tasks.filterStatusTask);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const tasksAll = tasksAdapter
    .getSelectors((state) => state.tasks)
    .selectAll(store.getState());

  const showListTasks = () => {
    if (statusLoadingTasks === "idle") {
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner />
        </div>
      );
    } else {
      const tasksAllFilterOfSearchIdTask = tasksAll.filter((task) =>
        task.id.includes(searchIdTask)
      );
      const tasksAllFilterOffilterStatusTask =
        tasksAllFilterOfSearchIdTask.filter((task) =>
          task.status.includes(filterStatusTask)
        );
      return tasksAllFilterOffilterStatusTask.map((task) => {
        return <Task data={task} key={task.id} />;
      });
    }
  };

  return (
    <div className="dve__tasks">
      <div className="dve__title title">
        <div className="title__number">Номер задачи</div>
        <div className="title__status">Статус</div>
        <div className="title__description">Полное описание задачи</div>
        <div className="title__lastcomment">Последний комментарий</div>
        <div className="title__responsibleemployee">Ответсвенный сотрудник</div>
        <div className="title__counterparty">Контрагент</div>
      </div>
      {showListTasks()}
    </div>
  );
};

const Task = (props) => {
  const {
    id,
    status,
    description,
    comments,
    responsibleemployee,
    counterparty,
  } = props.data;

  const showDescription =
    description.length > 25 ? description.slice(0, 24) + "..." : description;
  const lastComment = comments.slice(-1).join();
  const showComment =
    lastComment.length > 25 ? lastComment.slice(0, 24) + "..." : lastComment;

  return (
    <div className="dve__task task">
      <NavLink to={`/infoTask/${id}`} className={() => "task__number"}>
        {id}
      </NavLink>
      <div className="task__status">{status}</div>
      <div className="task__description">{showDescription}</div>
      <div className="task__lastcomment">{showComment}</div>
      <div className="task__responsibleemployee">{responsibleemployee}</div>
      <div className="task__counterparty">{counterparty}</div>
    </div>
  );
};

export default ListTasks;
