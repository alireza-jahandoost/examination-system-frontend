import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { convertFromUTCToHumanReadable } from "../../../utilities/dateAndTime.utility";

import { BsPerson, BsEnvelope, BsCalendar4 } from "react-icons/bs";

import ChangePasswordForm from "./change-password-form.component";

import { AuthenticationContext } from "../../../contexts/authentication-context/authentication.context";

const SettingsPage = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <>
      <Container>
        <div>
          <Row>
            <Col md={4} lg={6}>
              <div className="lead text-start bg-white border shadow rounded p-3 h-100">
                <div className="mb-4">
                  <p>
                    <span className="pe-2">
                      <BsPerson />
                    </span>
                    <span>User Name: </span>
                  </p>
                  <p className="text-break">{user?.user_name}</p>
                </div>
                <div className="mb-4">
                  <p>
                    <span className="pe-2">
                      <BsEnvelope />
                    </span>
                    <span>User Email: </span>
                  </p>
                  <p className="text-break">{user?.user_email}</p>
                </div>
                <div className="mb-4">
                  <p>
                    <span className="pe-2">
                      <BsCalendar4 />
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
              <div className="text-start mt-3 mt-md-0 bg-white shadow border rounded p-3 h-auto h-md-100">
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
