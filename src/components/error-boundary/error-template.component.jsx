import "./error-template.styles.css";
import { Link } from "react-router-dom";
// import { BsInstagram, BsTelegram, BsTwitter, BsLinkedin } from "react-icons/bs";
import programRoutes from "../../constants/program-routes.constant";
import externalRoutes from "../../constants/external-routes.constant";

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
          {
            // <a href={externalRoutes.socialMedia.linkedin()}>
            //   <BsLinkedin />
            // </a>
            // <a href={externalRoutes.socialMedia.twitter()}>
            //   <BsTwitter />
            // </a>
            // <a href={externalRoutes.socialMedia.instagram()}>
            //   <BsInstagram />
            // </a>
            // <a href={externalRoutes.socialMedia.telegram()}>
            //   <BsTelegram />
            // </a>
          }
        </div>
      </div>
    </div>
  );
};

export default ErrorTemplate;
