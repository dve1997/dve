import { Helmet } from "react-helmet";

import NavbarStub from "../../components/navbarStub/NavbarStub";
import CreateTask from "../../components/createTask/CreateTask";

const CreateTaskPage = () => {
  return (
    <>
      <Helmet>
        <meta name="createTaskPage" content="Page for create task" />
        <title>DVE craete task</title>
      </Helmet>
      <nav className="dve__nav">
        <NavbarStub />
      </nav>
      <article className="dve__article">
        <CreateTask />
      </article>
    </>
  );
};

export default CreateTaskPage;
