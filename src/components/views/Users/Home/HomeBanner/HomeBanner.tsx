"use client"

import { IBanner } from "@/src/types/Banner"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import { Skeleton } from "@heroui/react"

interface IHomeBanner {
    banners: IBanner[]
    isLoadingBanner: boolean
}

const HomeBanner = (props: IHomeBanner) => {
    const { banners, isLoadingBanner } = props

    return (
        <div className="mx-4 h-[25vw] lg:mx-0 lg:mb-1">
            {!isLoadingBanner ? (
                <Swiper pagination={{ dynamicBullets: true, clickable: true }} spaceBetween={30} loop modules={[Autoplay, Pagination]} className="h-full w-full" autoplay={{ delay: 2500, disableOnInteraction: false }}>
                    {banners.map((banner: IBanner) => (
                        <SwiperSlide key={banner._id}>
                            <Image src={`${banner.image}`} alt={`${banner.title}`} width={800} height={800} className="h-[80%] w-full rounded-2xl xs:object-cover lg:h-[90%]" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Skeleton className="h-[80%] w-full rounded-2xl lg:h-[90%]" />
            )}
        </div>
    )
}

export default HomeBanner
