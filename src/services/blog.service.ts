import instance from "../lib/axios/instance"
import { IBlog } from "../types/Blog"
import ENDPOINT from "./endpoint"

const BlogService = {
    addBlog: (payload: IBlog) => instance.post(`${ENDPOINT.BLOG}`, payload),
    findBlog: (params?: string) => instance.get(`${ENDPOINT.BLOG}?${params}`),
    findBySlug: (slug: string) => instance.get(`${ENDPOINT.BLOG}/slug/${slug}`),
    findOne: (id: string) => instance.get(`${ENDPOINT.BLOG}/${id}`),
}

export default BlogService