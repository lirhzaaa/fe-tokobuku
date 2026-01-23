import BookService from "@/src/services/book.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteBook = () => {
    const DeleteBook = async (id: string) => {
        return await BookService.deleteBook(id)
    }

    const {
        mutate: mutateDeleteBook,
        isPending: isPendingDeleteBook,
        isSuccess: isSuccessDeleteBook
    } = useMutation({
        mutationFn: DeleteBook,
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
                description: " Delete Book Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteBook,
        isPendingDeleteBook,
        isSuccessDeleteBook
    }
}

export default useDeleteBook