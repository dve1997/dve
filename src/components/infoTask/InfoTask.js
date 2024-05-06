import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { fetchInfoTask } from "../listTasks/ListTasksSlice";
import Spinner from "../spinner/Spinner";

import "./infoTask.scss";

const InfoTask = () => {
  const idTask = useParams().idTask;
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.task);

  useEffect(() => {
    dispatch(fetchInfoTask(idTask));
  }, []);

  const showInfoTask = () => {
    if (task.length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner />
        </div>
      );
    } else {
      return <Task data={task} />;
    }
  };

  return <div className="dve__infotask">{showInfoTask()}</div>;
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

  const createComments = () => {
    return comments.map((comment, i) => {
      return <Comments comment={comment} key={i} />;
    });
  };

  return (
    <>
      <div className="dve__info info">
        <div className="info__number">
          <span>Номер задачи:</span> {id}
        </div>
        <div className="info__status">{status}</div>
        <div className="info__description">
          <span>Полное описание задачи:</span> {description}
        </div>
        <div className="info__responsibleemployee">
          <span>Ответсвенный сотрудник:</span> {responsibleemployee}
        </div>
        <div className="info__counterparty">
          <span>Контрагент:</span> {counterparty}
        </div>
        <div className="info__comments">
          <div className="info__commenttitle">
            <span>Комментарии:</span>
          </div>
          {createComments()}
        </div>
        <button className="create__btn">
          <NavLink
            to="/"
            style={() => {
              return {
                color: "black",
                textDecoration: "none",
              };
            }}
          >
            Вернуться к списку запросов
          </NavLink>
        </button>
      </div>
    </>
  );
};

const Comments = ({ comment }) => {
  return <div className="info__comment"> {comment}</div>;
};

export default InfoTask;
