"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { ILogin } from "@/src/types/Auth";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const loginSchema = yup.object().shape({
    identifier: yup.string().required("Please input your email or username"),
    password: yup.string().required("Please input your password"),
})

const useLogin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleVisible = () => setVisible(!visible)
    const [visible, setVisible] = useState(false);
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl,
        });
        if (result?.error) {
            throw new Error(result.error);
        }

        if (!result?.ok) {
            throw new Error("Login failed");
        }

        return result;
    }

    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError(error) {
            addToast({
                title: "Login Gagal",
                description: error.message === "CredentialsSignin"
                    ? "Email/username atau password salah"
                    : "Terjadi kesalahan saat login",
                color: "danger",
            });
        },
        onSuccess: (result) => {
            if (!result) return;
            addToast({
                title: "Success",
                description: "Login berhasil",
                color: "success",
            });
            router.push(callbackUrl);
            reset();
        }
    })

    const handleLogin = (data: ILogin) => mutateLogin(data)

    return {
        visible,
        handleVisible,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    };
};

export default useLogin;
