import CategoryService from "@/src/services/category.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteCategory = () => {
    const deleteCategory = async (id: string) => {
        return await CategoryService.deleteCategoryById(id)
    }

    const {
        mutate: mutateDeleteCategory,
        isPending: isPendingDeleteCategory,
        isSuccess: isSuccessDeleteCategory
    } = useMutation({
        mutationFn: deleteCategory,
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
                description: " Delete Category Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteCategory,
        isPendingDeleteCategory,
        isSuccessDeleteCategory
    }
}

export default useDeleteCategory