import BlogService from "@/src/services/blog.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteBlog = () => {
    const DeleteBlog = async (id: string) => {
        return await BlogService.deleteBlog(id)
    }

    const {
        mutate: mutateDeleteBlog,
        isPending: isPendingDeleteBlog,
        isSuccess: isSuccessDeleteBlog
    } = useMutation({
        mutationFn: DeleteBlog,
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            addToast({
                title: "Success",
                description: " Delete Blog Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteBlog,
        isPendingDeleteBlog,
        isSuccessDeleteBlog
    }
}

export default useDeleteBlog