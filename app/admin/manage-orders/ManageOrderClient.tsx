"use client";

import ActionBtn from "@/app/components/ActionBtn";
import { Heading } from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdAccessTime,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

type ExtendedOrder = Order & {
  user: User;
};

interface ManageOrderClientProps {
  orders: ExtendedOrder[];
}

const ManageOrderClient: FC<ManageOrderClientProps> = ({ orders }) => {
  let rows: any = [];
  const router = useRouter();

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createdAt).fromNow(),
        delivaryStatus: order.delivaryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(INR)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800 ">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTime}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "delivaryStatus",
      headerName: "Delivary Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.delivaryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTime}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.delivaryStatus === "dispatched" ? (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.delivaryStatus === "delivered" ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className="flex justify-between h-full items-center
           gap-4 w-full"
          >
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => handleDispatch(params.row.id)}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => handleDelivered(params.row.id)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        delivaryStatus: "dispatched",
      })
      .then(() => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch(() => {
        toast.error("Oops! Something went wrong");
      });
  }, []);

  const handleDelivered = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        delivaryStatus: "delivered",
      })
      .then(() => {
        toast.success("Order Delivered");
        router.refresh();
      })
      .catch(() => {
        toast.error("Oops! Something went wrong");
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrderClient;
