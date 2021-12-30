import { useContext } from "react";

import ProfileContainer from "../../../../components/profile-container/profile-container.component";
import ParticipantInfo from "./participant-info.component";
import AnswersInfo from "./answers-info.component";

import { ShowParticipantContext } from "../../../../contexts/show-participant-context/show-participant.context";
import { UserProvider } from "../../../../contexts/user-context/user.context";
import { ExamInfoProvider } from "../../../../contexts/exam-info-context/exam-info.context";

const ShowParticipant = () => {
  const { participant, isContextLoaded } = useContext(ShowParticipantContext);

  if (!isContextLoaded) {
    return <p> Loading... </p>;
  }

  return (
    <ExamInfoProvider examId={participant.exam_id}>
      <ProfileContainer>
        <UserProvider userId={participant.user_id}>
          <ParticipantInfo />
        </UserProvider>

        <AnswersInfo />
      </ProfileContainer>
    </ExamInfoProvider>
  );
};

export default ShowParticipant;
