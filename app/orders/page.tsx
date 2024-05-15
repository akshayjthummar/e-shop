import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { Container } from "@/app/components/Container";
import { NullData } from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }
  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
