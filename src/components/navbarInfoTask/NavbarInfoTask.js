import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CSSTransition } from "react-transition-group";

import {
  responsibleEmployeesAdapter,
  fetchResponsibleEmployees,
} from "../createTask/CreateTaskSlice";
import { fetchUpdateTask, fetchDeleteTask } from "../listTasks/ListTasksSlice";
import store from "../../store/store";
import Spinner from "../spinner/Spinner";

import "./navbarInfoTask.scss";

const NavbarInfoTask = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.task);

  useEffect(() => {
    dispatch(fetchResponsibleEmployees());
  }, []);

  const responsibleEmployees = responsibleEmployeesAdapter
    .getSelectors((state) => state.responsibleEmployees)
    .selectAll(store.getState());

  const [showModalRead, setShowModalRead] = useState(false);
  const [showModalCom, setShowModalCom] = useState(false);
  const [showModalEmp, setShowModalEmp] = useState(false);
  const [showModalSt, setShowModalSt] = useState(false);

  const showModalWindow = (e) => {
    switch (e.target.getAttribute("datatype")) {
      case "read":
        setShowModalRead(true);
        break;
      case "com":
        setShowModalCom(true);
        break;
      case "emp":
        setShowModalEmp(true);
        break;
      case "st":
        setShowModalSt(true);
        break;
      default:
        break;
    }
  };

  const closeModalWindow = (e) => {
    switch (e.target.getAttribute("datatype")) {
      case "read":
        setShowModalRead(false);
        break;
      case "com":
        setShowModalCom(false);
        break;
      case "emp":
        setShowModalEmp(false);
        break;
      case "st":
        setShowModalSt(false);
        break;
      default:
        break;
    }
  };

  const deleteTask = () => {
    dispatch(fetchDeleteTask(task.id));

    const messageAboutDelete = document.createElement("div");
    messageAboutDelete.innerHTML = `Задача успешно удалена`;
    messageAboutDelete.style.cssText = `
    color: red;
    font-weight: 700;
    `;
    document.querySelector(".info__number").prepend(messageAboutDelete);
  };

  const showNavbarInfoTask = () => {
    if (responsibleEmployees.length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner />
        </div>
      );
    } else {
      return (
        <>
          <div
            className="dve__btn dve__btn_read"
            datatype="read"
            onClick={showModalWindow}
          >
            Редактировать
          </div>
          <div className="dve__btn dve__btn_del" onClick={deleteTask}>
            Удалить
          </div>
          <div
            className="dve__btn dve__btn_com"
            datatype="com"
            onClick={showModalWindow}
          >
            Добавить комментарий
          </div>
          <div
            className="dve__btn dve__btn_emp"
            datatype="emp"
            onClick={showModalWindow}
          >
            Изменить ответсвенного сотрудника
          </div>
          <div
            className="dve__btn dve__btn_st"
            datatype="st"
            onClick={showModalWindow}
          >
            Изменить статус
          </div>
          <WindowUpdateDescription
            showModalRead={showModalRead}
            closeModalWindow={closeModalWindow}
            task={task}
          />
          <WindowCommentCreate
            showModalCom={showModalCom}
            closeModalWindow={closeModalWindow}
            task={task}
          />
          <WindowUpdateResponsibleEmployee
            showModalEmp={showModalEmp}
            closeModalWindow={closeModalWindow}
            task={task}
            data={responsibleEmployees}
          />
          <WindowUpdateStatus
            showModalSt={showModalSt}
            closeModalWindow={closeModalWindow}
            task={task}
          />
        </>
      );
    }
  };

  return <div className="dve__navtasks">{showNavbarInfoTask()}</div>;
};

const WindowUpdateDescription = ({ showModalRead, closeModalWindow, task }) => {
  const dispatch = useDispatch();
  const read = useRef(null);

  return (
    <CSSTransition
      read={read}
      in={showModalRead}
      timeout={300}
      classNames="animationshowmodal"
      unmountOnExit
    >
      <div className="dve__updatedescription" ref={read}>
        <Formik
          initialValues={{
            description: task.description,
          }}
          validationSchema={Yup.object().shape({
            description: Yup.string()
              .min(10, "Минимум 10 букв")
              .max(250, "Максимум 250 букв")
              .required("Обязательное поле"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const body = {
              ...task,
              description: values.description,
            };
            dispatch(fetchUpdateTask(body));
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label htmlFor="updatedescription" className="dve__label">
              Введите описание задачи
            </label>
            <Field
              id="description"
              type="description"
              name="description"
              className="dve__textarea"
              as="textarea"
            />
            <ErrorMessage
              component="div"
              name="description"
              className="create__invalid"
            />
            <button
              type="submit"
              className="dve__button"
              datatype="read"
              onClick={closeModalWindow}
            >
              Редактировать задачу
            </button>
            <div
              datatype="read"
              onClick={closeModalWindow}
              className="dve__close"
            >
              &#10006;
            </div>
          </Form>
        </Formik>
      </div>
    </CSSTransition>
  );
};

const WindowCommentCreate = ({ showModalCom, closeModalWindow, task }) => {
  const dispatch = useDispatch();
  const com = useRef(null);

  return (
    <CSSTransition
      com={com}
      in={showModalCom}
      timeout={300}
      classNames="animationshowmodal"
      unmountOnExit
    >
      <div className="dve__commentcreate" ref={com}>
        <Formik
          initialValues={{
            comment: "",
          }}
          validationSchema={Yup.object().shape({
            comment: Yup.string()
              .min(10, "Минимум 10 букв")
              .max(250, "Максимум 250 букв")
              .required("Обязательное поле"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const body = {
              ...task,
              comments: [...task.comments, values.comment],
            };
            dispatch(fetchUpdateTask(body));
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label htmlFor="commentcreate" className="dve__label">
              Введите комментарий
            </label>
            <Field
              id="comment"
              type="comment"
              name="comment"
              className="dve__textarea"
              as="textarea"
            />
            <ErrorMessage
              component="div"
              name="comment"
              className="create__invalid"
            />
            <button
              type="submit"
              className="dve__button"
              datatype="com"
              onClick={closeModalWindow}
            >
              Добавить комментарий
            </button>
            <div
              datatype="com"
              onClick={closeModalWindow}
              className="dve__close"
            >
              &#10006;
            </div>
          </Form>
        </Formik>
      </div>
    </CSSTransition>
  );
};

const WindowUpdateResponsibleEmployee = ({
  showModalEmp,
  closeModalWindow,
  task,
  data,
}) => {
  const dispatch = useDispatch();
  const emp = useRef(null);

  return (
    <CSSTransition
      emp={emp}
      in={showModalEmp}
      timeout={300}
      classNames="animationshowmodal"
      unmountOnExit
    >
      <div className="dve__updateresponsibleemployee" ref={emp}>
        <Formik
          initialValues={{
            responsibleemployee: task.responsibleemployee,
          }}
          validationSchema={Yup.object().shape({
            responsibleemployee: Yup.string().required("Обязательное поле"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const body = {
              ...task,
              responsibleemployee: values.responsibleemployee,
            };
            dispatch(fetchUpdateTask(body));
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label htmlFor="updateresponsibleemployee" className="dve__label">
              Ответсвенны сотрудник
            </label>
            <Field
              id="responsibleemployee"
              type="responsibleemployee"
              name="responsibleemployee"
              className="dve__select"
              as="select"
            >
              <option value="все">Выберите сотрудника</option>
              <option value={data[0].employee}>{data[0].employee}</option>
              <option value={data[1].employee}>{data[1].employee}</option>
            </Field>
            <ErrorMessage
              component="div"
              name="responsibleemployee"
              className="create__invalid"
            />
            <button
              type="submit"
              className="dve__button"
              datatype="emp"
              onClick={closeModalWindow}
            >
              Изменить ответсвенного сотрудника
            </button>
            <div
              datatype="emp"
              onClick={closeModalWindow}
              className="dve__close"
            >
              &#10006;
            </div>
          </Form>
        </Formik>
      </div>
    </CSSTransition>
  );
};

const WindowUpdateStatus = ({ showModalSt, closeModalWindow, task }) => {
  const dispatch = useDispatch();
  const st = useRef(null);

  return (
    <CSSTransition
      st={st}
      in={showModalSt}
      timeout={300}
      classNames="animationshowmodal"
      unmountOnExit
    >
      <div className="dve__updatestatus" ref={st}>
        <Formik
          initialValues={{
            status: task.status,
          }}
          validationSchema={Yup.object().shape({
            status: Yup.string().required("Обязательное поле"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const body = {
              ...task,
              status: values.status,
            };
            dispatch(fetchUpdateTask(body));
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label htmlFor="updatestatus" className="dve__label">
              Статус запроса
            </label>
            <Field
              id="status"
              type="status"
              name="status"
              className="dve__select"
              as="select"
            >
              <option value="Назначена">Назначена</option>
              <option value="Открыта">Открыта</option>
              <option value="Закрыта">Закрыта</option>
            </Field>
            <ErrorMessage
              component="div"
              name="status"
              className="create__invalid"
            />
            <button
              type="submit"
              className="dve__button"
              datatype="st"
              onClick={closeModalWindow}
            >
              Изменить статус запроса
            </button>
            <div
              datatype="st"
              onClick={closeModalWindow}
              className="dve__close"
            >
              &#10006;
            </div>
          </Form>
        </Formik>
      </div>
    </CSSTransition>
  );
};

export default NavbarInfoTask;
