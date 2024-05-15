"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { FC } from "react";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrese: () => void;
  handleQtyDecrese: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyDecrese,
  handleQtyIncrese,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQtyDecrese} className={btnStyles}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQtyIncrese} className={btnStyles}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
