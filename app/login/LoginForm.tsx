"use client";

import { FC, useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { safeUser } from "@/types";

interface LoginFormProps {
  currentUser: safeUser | null;
}

const LoginForm: FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      }
      if (callback?.error) {
        toast.success(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting</p>;
  }
  return (
    <>
      <Heading title="Sign in for E-Shop" />
      <Button
        label="Continue with google"
        outline
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-[1px]" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account?{" "}
        <Link className="underline " href={"/register"}>
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
