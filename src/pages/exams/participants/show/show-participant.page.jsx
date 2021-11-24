import { ShowParticipantProvider } from "../../../../contexts/show-participant-context/show-participant.context";

import ShowParticipant from "./show-participant.component";

const ShowParticipantPage = () => {
  return (
    <ShowParticipantProvider>
      <ShowParticipant />
    </ShowParticipantProvider>
  );
};

export default ShowParticipantPage;
