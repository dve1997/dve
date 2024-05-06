import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import {
  fetchResponsibleEmployees,
  responsibleEmployeesAdapter,
} from "./CreateTaskSlice";
import { fetchCreateTask } from "../listTasks/ListTasksSlice";
import store from "../../store/store";
import Spinner from "../spinner/Spinner";

import "./createTask.scss";

const CreateTask = () => {
  const dispatch = useDispatch();
  const statusLoadingResponsibleEmployees = useSelector(
    (state) => state.responsibleEmployees.statusLoadingResponsibleEmployees
  );

  useEffect(() => {
    dispatch(fetchResponsibleEmployees());
  }, []);

  const responsibleEmployees = responsibleEmployeesAdapter
    .getSelectors((state) => state.responsibleEmployees)
    .selectAll(store.getState());

  const showCreateTask = () => {
    if (statusLoadingResponsibleEmployees === "idle") {
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner />
        </div>
      );
    } else {
      return <FieldsTask data={responsibleEmployees} />;
    }
  };

  return <div className="dve__createtask">{showCreateTask()}</div>;
};

const FieldsTask = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="dve__create create">
      <Formik
        initialValues={{
          id: "",
          status: "Назначена",
          description: "",
          responsibleemployee: "",
          comments: [],
          counterparty: "Денисов Влаислав Евгеньевич",
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string()
            .min(10, "Минимум 10 букв")
            .max(250, "Максимум 250 букв")
            .required("Обязательное поле"),
          responsibleemployee: Yup.string().required("Обязательное поле"),
          comments: Yup.string()
            .min(10, "Минимум 10 букв")
            .max(250, "Максимум 250 букв")
            .required("Обязательное поле"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const commentsArray = values.comments.split();
          dispatch(
            fetchCreateTask(
              JSON.stringify(
                { ...values, id: uuidv4(), comments: commentsArray },
                null,
                2
              )
            )
          );
          setSubmitting(false);
          resetForm();
        }}
      >
        <Form>
          <div className="create__description">
            <label htmlFor="description">Введите описание задачи</label>
            <Field
              id="description"
              type="description"
              name="description"
              className="create__descriptionfield"
              as="textarea"
            />
            <ErrorMessage
              component="div"
              name="description"
              className="create__invalid"
            />
          </div>
          <div className="create__responsibleemployee">
            <label htmlFor="responsibleemployee">
              Выберите ответственного сотрудника
            </label>
            <Field
              id="responsibleemployee"
              type="responsibleemployee"
              name="responsibleemployee"
              className="create__responsibleemployeefield"
              as="select"
            >
              <option value="все">Выберите сотрудника</option>
              <option value={props.data[0].employee}>
                {props.data[0].employee}
              </option>
              <option value={props.data[1].employee}>
                {props.data[1].employee}
              </option>
            </Field>
            <ErrorMessage
              component="div"
              name="responsibleemployee"
              className="create__invalid"
            />
          </div>
          <div className="create__comment">
            <label htmlFor="comments">Введите комментарий</label>
            <Field
              id="comments"
              type="comments"
              name="comments"
              className="create__commentsfield"
              as="textarea"
            />
            <ErrorMessage
              component="div"
              name="comments"
              className="create__invalid"
            />
          </div>
          <button type="submit" className="create__btn">
            Создать задачу
          </button>
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
        </Form>
      </Formik>
    </div>
  );
};

export default CreateTask;
