"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const registerSchema =  yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup.string().min(8, "Password must be at least 8 characters").required("Confirm Password is required"),
})

const useRegister = () => {
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

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     errors,
//     setError
//   } useForm({
//     resolver: yupResolver(registerSchema)
//   })

  return {
    visible,
    setVisible,
    handleVisible,
  };
};

export default useRegister;
