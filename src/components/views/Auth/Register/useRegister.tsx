"use client";

import AuthService from "@/src/services/auth.service";
import { IRegister } from "@/src/types/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your fullName"),
  username: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(8, "Minimal 8 Characters")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please input confirm password"),
});

const useRegister = () => {
  const router = useRouter()

  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisible = (key: "password" | "confirmPassword") => {
    setVisible({
      ...visible,
      [key]: !visible[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const registerService = async (payload: IRegister) => {
    const result = await AuthService.register(payload)
    return result
  }


  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      addToast({
        title: "Registration Failed",
        description: "This email is already registered or the server is unreachable. Please try again or use a different email.",
        color: "danger",
      });
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Account Created!",
        description: "Your registration was successful. You can now check your email for account activation.",
        color: "success",
      });
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data)

  return {
    visible,
    setVisible,
    handleVisible,

    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
