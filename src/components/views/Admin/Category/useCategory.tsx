"use client";

import useChangeUrl from "@/src/hooks/useChangeUrl";
import CategoryService from "@/src/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useCategory = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCategories = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const result = await CategoryService.getCategory(params);
    return result.data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["Categories", currentPage, currentLimit, currentSearch],
    queryFn: getCategories,
    enabled: !!currentPage && !!currentLimit,
  });

  return {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,

    selectedId,
    setSelectedId,
  };
};

export default useCategory;