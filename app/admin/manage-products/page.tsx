import getProducts from "@/actions/getProducts";
import ManageProductClient from "./ManageProductClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/NullData";
import { Container } from "@/app/components/Container";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageProductClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
