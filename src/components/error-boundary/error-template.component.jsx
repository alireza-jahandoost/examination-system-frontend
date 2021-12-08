import "./error-template.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import programRoutes from "../../constants/program-routes.constant";

const ErrorTemplate = ({ status, message, phrase }) => {
  return (
    <div id="notfound">
      <div className="notfound-bg">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="notfound">
        <div className="notfound-404">{status && <h1>{status}</h1>}</div>
        <h2>{message ? message : "An Error Occured"}</h2>
        <p>
          {phrase
            ? phrase
            : "Something went wrong. Please try again later. If the problem remains, contact us."}
        </p>
        <Link to={programRoutes.profile}>Homepage</Link>
        <div className="notfound-social">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorTemplate;
