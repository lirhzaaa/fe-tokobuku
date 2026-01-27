"use client"

import { Fragment } from "react/jsx-runtime"
import HomeBanner from "./HomeBanner"
import useHome from "./useHome"
import HomeBook from "./HomeBook"
import HomeBlog from "./HomeBlog"

const Home = () => {
  const {
    dataBanner,
    dataFeaturedBook,
    dataCategory,
    dataBlog,

    isLoadingBanner,
    isLoadingFeaturedBook,
    isLoadingCategory,
    isLoadingBlog
  } = useHome()

  const books = dataFeaturedBook?.data || []
  const categories = dataCategory?.data || []

  console.log(dataBlog?.data)
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
      <HomeBlog title="Artikel Terbaru" subtitle="Temukan artikel menarik yang kamu cari!!!" blogs={dataBlog?.data} isLoadingBlog={isLoadingBlog} />
    </Fragment>
  )
}

export default Home