"use client";

import { Button } from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/app/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  quantity: number;
  selectedImg: SelectedImgType;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    quantity: 1,
    selectedImg: { ...product.images[0] },
  });
  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProduct) {
      const existingIndex = cartProducts?.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex! > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, item: any) => acc + item.rating,
          0
        ) / product.reviews.length
      : 0;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyDecrese = useCallback(() => {
    setCartProduct((prev) => {
      const newQuantity = prev.quantity - 1;
      return { ...prev, quantity: Math.max(newQuantity, 1) };
    });
  }, [cartProduct]);
  const handleQtyIncrese = useCallback(() => {
    setCartProduct((prev) => {
      const newQuantity = prev.quantity + 1;
      return { ...prev, quantity: Math.min(newQuantity, 99) };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-12">
      <div>
        <ProductImage
          product={product}
          cartProduct={cartProduct}
          handleColorSelect={handleColorSelect}
        />
      </div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div
          className={`${
            product.inStock ? "text-teal-400" : "text-red-400"
          } font-semibold`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />

            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrese={handleQtyDecrese}
              handleQtyIncrese={handleQtyIncrese}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add to Cart"
                onClick={() => handleAddProductCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
