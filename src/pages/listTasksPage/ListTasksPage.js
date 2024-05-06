import { Helmet } from "react-helmet";

import NavbarListTasks from "../../components/navbarListTasks/NavbarListTasks";
import ListTasks from "../../components/listTasks/ListTasks";

const ListTasksPage = () => {
  return (
    <>
      <Helmet>
        <meta name="titlePage" content="Website for working with tasks" />
        <title>DVE list tasks</title>
      </Helmet>
      <nav className="dve__nav">
        <NavbarListTasks />
      </nav>
      <article className="dve__article">
        <ListTasks />
      </article>
    </>
  );
};

export default ListTasksPage;
