import BookService from "@/src/services/book.service"
import CategoryService from "@/src/services/category.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object({
    category: Yup.string().required("Please Select Category"),
    isFeatured: Yup.string().required("Please Select Featured"),
})

const useFilterBook = () => {
    const {
        data: dataCategory,
        isSuccess: isSuccessCategory,
    } = useQuery({
        queryKey: ["category"],
        queryFn: () => CategoryService.getCategory(),
    })

    const {
        data: dataBookFeatured,
        isSuccess: isSuccessBookFeatured,
    } = useQuery({
        queryKey: ["book-featured"],
        queryFn: () => BookService.findBook(),
    })

    const {
        control,
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    })

    return {
        control,
        setValue,

        dataCategory,
        dataBookFeatured,

        isSuccessCategory,
        isSuccessBookFeatured,
    }
}

export default useFilterBook
