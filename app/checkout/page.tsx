import { Container } from "../components/Container";
import FormWarp from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWarp>
          <CheckoutClient />
        </FormWarp>
      </Container>
    </div>
  );
};

export default Checkout;
