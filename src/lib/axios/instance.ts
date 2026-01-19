"use client";

import axios from "axios";
import { environment } from "@/src/config/environment";
import { getSession } from "next-auth/react";
import { SessionExtended } from "@/src/types/Auth";

const instance = axios.create({
  baseURL: environment.API_URL,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(async (request) => {
  const session: SessionExtended | null = await getSession();

  if (session?.accessToken) {
    request.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  if (!request.headers["Content-Type"]) {
    request.headers["Content-Type"] = "application/json";
  }

  return request;
});

export default instance;
