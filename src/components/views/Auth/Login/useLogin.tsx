"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
    identifier: yup.string().required("Username is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})

const useLogin = () => {
    const [visible, setVisible] = useState({
        password: false,
    });

    const handleVisible = (key: "password") => {
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
    //     resolver: yupResolver(loginSchema)
    //   })

    return {
        visible,
        setVisible,
        handleVisible,
    };
};

export default useLogin;
