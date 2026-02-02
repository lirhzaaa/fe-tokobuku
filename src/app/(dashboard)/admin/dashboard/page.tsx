"use client"

import Home from "@/src/components/views/Admin/Home";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

const HomePageAdmin = () => {
  return (
    <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
      <Home />
    </Suspense>
  )
}

export default HomePageAdmin