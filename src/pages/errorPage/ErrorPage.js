import { Helmet } from "react-helmet";

import "./errorPage.scss";
import error from "../../assets/error.png";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <meta name="errorPage" content="Page error" />
        <title>DVE error</title>
      </Helmet>
      <div className="spares__error">
        <h3>Возникла ошибка, указанной странцы не существует.</h3>
        <img src={error} alt="error" />
      </div>
    </>
  );
};

export default ErrorPage;
