import { getCurrentUser } from "@/actions/getCurrentUser";
import { Container } from "../components/Container";
import FormWarp from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWarp>
        <RegisterForm currentUser={currentUser} />
      </FormWarp>
    </Container>
  );
};

export default Register;
