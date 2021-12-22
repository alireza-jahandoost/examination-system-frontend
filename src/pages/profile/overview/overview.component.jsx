import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  BsFileEarmarkMedical,
  BsFileEarmarkCheck,
  BsGear,
} from "react-icons/bs";
import ItemButton from "./item-button.component";

import { CreatedExamsContext } from "../../../contexts/created-exams-context/created-exams.context";
import { ParticipatedExamsContext } from "../../../contexts/participated-exams-context/participated-exams.context";
import programRoutes from "../../../constants/program-routes.constant";

const Overview = () => {
  const createdExams = useContext(CreatedExamsContext);
  const participatedExams = useContext(ParticipatedExamsContext);

  return (
    <Container>
      <div className="bg-light m-3 p-3 ">
        <div>
          <Row>
            <Col xs={12} md={6} xl={4} className="my-3">
              <ItemButton
                text="Created Exams"
                subText={createdExams.numberOfAllExams}
                variant="success"
                icon={<BsFileEarmarkMedical />}
                to={programRoutes.indexCreatedExams()}
              />
            </Col>
            <Col xs={12} md={6} xl={4} className="my-3">
              <ItemButton
                text="Participated Exams"
                subText={participatedExams.numberOfAllExams}
                variant="primary"
                icon={<BsFileEarmarkCheck />}
                to={programRoutes.indexParticipatedExams()}
              />
            </Col>
            <Col xs={12} md={6} xl={4} className="my-3">
              <ItemButton
                text="Settings"
                variant="info"
                icon={<BsGear />}
                to={programRoutes.settings()}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Overview;
