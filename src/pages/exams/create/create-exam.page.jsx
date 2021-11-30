import ProfileContainer from "../../../components/profile-container/profile-container.component";
import CreateExamForm from "./create-exam-form.component";

const CreateExamPage = () => {
  return (
    <ProfileContainer>
      <CreateExamForm className="text-start" />
    </ProfileContainer>
  );
};

export default CreateExamPage;
