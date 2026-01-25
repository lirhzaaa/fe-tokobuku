"use client"

import { Fragment } from "react/jsx-runtime"
import HomeBanner from "./HomeBanner"
import useHome from "./useHome"
import HomeBook from "./HomeBook"

const Home = () => {
  const {
    dataBanner,
    dataFeaturedBook,
    dataCategory,

    isLoadingBanner,
    isLoadingFeaturedBook,
    isLoadingCategory
  } = useHome()

  const books = dataFeaturedBook?.data || []
  const categories = dataCategory?.data || []

  return (
    <Fragment>
      <HomeBanner banners={dataBanner?.data} isLoadingBanner={isLoadingBanner} />
      <HomeBook 
        title="Rekomendasi Buku"
        subtitle="Temukan buku favorite yang kamu cari!!!" 
        books={books}
        categories={categories}
        isLoading={isLoadingFeaturedBook || isLoadingCategory}
      />
    </Fragment>
  )
}

export default Home