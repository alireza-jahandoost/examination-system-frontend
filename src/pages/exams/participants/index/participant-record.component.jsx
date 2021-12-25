import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import programRoutes from "../../../../constants/program-routes.constant";
import { UserContext } from "../../../../contexts/user-context/user.context";
import { ConfirmParticipantContext } from "../../../../contexts/confirm-participant-context/confirm-participant.context";

const ParticipantRecord = ({
  participant,
  examId,
  index,
  needsConfirmation,
}) => {
  const { user, isLoading, isContextLoaded } = useContext(UserContext);
  const confirmParticipantObject = useContext(ConfirmParticipantContext);

  const handleConfirm = () => {
    confirmParticipantObject.confirmUser(participant.user_id);
  };

  return (
    <tr key={participant.participant_id}>
      <td>{index}</td>
      <td>{isLoading || !isContextLoaded ? "Loading..." : user.user_name}</td>
      <td>
        {participant.status
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/( \w)|(^\w)/g, (e) => e.toUpperCase())}
      </td>
      {needsConfirmation && (
        <td>
          {participant.confirmed || confirmParticipantObject.confirmed ? (
            "Confirmed"
          ) : (
            <>
              <Button
                onClick={handleConfirm}
                disabled={confirmParticipantObject.isLoading}
              >
                {confirmParticipantObject.isLoading
                  ? "Loading..."
                  : "Confirm This Participant"}
              </Button>
              {confirmParticipantObject.errors.message && (
                <p className="text-danger">
                  {confirmParticipantObject.errors.message}
                </p>
              )}
            </>
          )}
        </td>
      )}
      <td>{participant.grade === null ? "_" : participant.grade}</td>
      <td>
        <Link
          to={programRoutes.showParticipant(examId, participant.participant_id)}
        >
          <Button variant="primary">more</Button>
        </Link>
      </td>
    </tr>
  );
};

export default ParticipantRecord;
