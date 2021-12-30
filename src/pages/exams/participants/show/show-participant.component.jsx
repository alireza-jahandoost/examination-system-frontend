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
        <h1 className="display-6">Participant Answers</h1>
        <UserProvider userId={participant.user_id}>
          <ParticipantInfo className="my-3" />
        </UserProvider>
      </ProfileContainer>

      <ProfileContainer className="my-5">
        <AnswersInfo className="" />
      </ProfileContainer>
    </ExamInfoProvider>
  );
};

export default ShowParticipant;
