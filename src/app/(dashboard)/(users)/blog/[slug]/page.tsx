import DetailBlogClientPage from "./DetailBlogClient"

const DetailBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  return <DetailBlogClientPage slug={slug} />
}

export default DetailBlogPage