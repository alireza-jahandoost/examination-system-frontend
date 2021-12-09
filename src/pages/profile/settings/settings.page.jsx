import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { convertFromUTCToHumanReadable } from "../../../utilities/dateAndTime.utility";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";

import ChangePasswordForm from "./change-password-form.component";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

const SettingsPage = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <>
      <h1>Settings</h1>
      <Container>
        <div>
          <Row>
            <Col md={4} lg={6}>
              <div className="lead text-start bg-light border shadow rounded p-3">
                <div>
                  <p>
                    <span className="pe-2">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span>User Name: </span>
                  </p>
                  <p className="text-break">{user?.user_name}</p>
                </div>
                <div>
                  <p>
                    <span className="pe-2">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span>User Email: </span>
                  </p>
                  <p className="text-break">{user?.user_email}</p>
                </div>
                <div>
                  <p>
                    <span className="pe-2">
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    <span>Registration Time: </span>
                  </p>
                  <p className="text-break">
                    {convertFromUTCToHumanReadable(user?.user_register_time)}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={8} lg={6}>
              <div className="text-start mt-3 mt-md-0 bg-light shadow border rounded p-3">
                <h2> Change Password </h2>
                <ChangePasswordForm />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SettingsPage;
