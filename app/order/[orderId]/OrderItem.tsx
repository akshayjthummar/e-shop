"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  product: CartProductType;
}

export const OrderItem = ({ product }: OrderItemProps) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={product.selectedImg.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>{truncateText(product.name)}</div>
          <div>{product.selectedImg.color}</div>
        </div>
      </div>

      <div className="justify-self-center">{formatPrice(product.price)}</div>
      <div className="justify-self-center">{product.quantity}</div>
      <div className="justify-self-end font-semibold">
        {(product.quantity * product.price).toFixed(2)}
      </div>
    </div>
  );
};
