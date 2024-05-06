import { Helmet } from "react-helmet";

import NavbarInfoTask from "../../components/navbarInfoTask/NavbarInfoTask";
import InfoTask from "../../components/infoTask/InfoTask";

const InfoTaskPage = () => {
  return (
    <>
      <Helmet>
        <meta name="infoTaskPage" content="Page for audit and update task" />
        <title>DVE info task</title>
      </Helmet>
      <nav className="dve__nav">
        <NavbarInfoTask />
      </nav>
      <article className="dve__article">
        <InfoTask />
      </article>
    </>
  );
};

export default InfoTaskPage;
