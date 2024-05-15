"use client";
import React, { FC, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { formatPrice } from "@/utils/formatPrice";
import toast from "react-hot-toast";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complate checkout" />
      </div>

      <h2 className="font-semibold mt-4 mb-2">Address Information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["IN", "US"] }}
      />

      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <div className="py-4 text-center text-2xl font-bold text-slate-700 ">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Proccessing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
