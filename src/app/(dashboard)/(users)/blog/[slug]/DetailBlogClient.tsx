"use client"

interface IDetailBlog {
  slug: string
}

const DetailBlogClientPage = ({ slug }: IDetailBlog) => {
  return <h1>Detail Blog {slug}</h1>
}

export default DetailBlogClientPage