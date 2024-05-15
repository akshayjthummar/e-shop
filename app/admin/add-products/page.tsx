import { Container } from "@/app/components/Container";
import FormWarp from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/NullData";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }
  return (
    <div className="p-8 ">
      <Container>
        <FormWarp>
          <AddProductForm currentUser={currentUser} />
        </FormWarp>
      </Container>
    </div>
  );
};

export default AddProducts;
