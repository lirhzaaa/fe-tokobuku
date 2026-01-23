"use client";

import useChangeUrl from "@/src/hooks/useChangeUrl";
import BannerService from "@/src/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useBanner = () => {
    const [selectedId, setSelectedId] = useState<string>("");
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getBanner = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const result = await BannerService.findBanner(params);
        const { data } = result;
        return data;
    };

    const {
        data: dataBanner,
        isLoading: isLoadingBanner,
        isRefetching: isRefetchingBanner,
        refetch: refetchBanner,
    } = useQuery({
        queryKey: ["Banners", currentPage, currentLimit, currentSearch],
        queryFn: () => getBanner(),
        enabled: !!currentPage && !!currentLimit,
    });

    return {
        dataBanner,
        isLoadingBanner,
        isRefetchingBanner,
        refetchBanner,

        selectedId,
        setSelectedId
    };
};

export default useBanner;
