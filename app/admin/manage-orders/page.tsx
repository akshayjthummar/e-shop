import getOrders from "@/actions/getOrders";
import ManageOrderClient from "./ManageOrderClient";
import { Container } from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/NullData";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageOrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
