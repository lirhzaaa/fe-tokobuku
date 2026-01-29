import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import CategoryService from "@/src/services/category.service"
import { useQuery } from "@tanstack/react-query"
import { DateValue } from "@heroui/react"

export interface BookFormValues {
    title: string
    author: string
    publishDate: DateValue
    description: string
    price: string
    stock: string
    category: string
    isPublish: string
    isFeatured: string
}

const schemaUpdateInformation = Yup.object().shape({
    title: Yup.string().required("Please input title"),
    author: Yup.string().required("Please input author"),
    publishDate: Yup.mixed<DateValue>().required("Please select publish date"),
    description: Yup.string().required("Please input description"),
    price: Yup.string().required("Please input price"),
    stock: Yup.string().required("Please input stock"),
    category: Yup.string().required("Please select category"),
    isPublish: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select status"),
})

const useInfoTab = () => {
    const {
        control: controlUpdateInformation,
        handleSubmit: handleSubmitUpdateInformation,
        formState: { errors: errorsUpdateInformation },
        reset: resetUpdateInformation,
        setValue: setValueUpdateInformation
    } = useForm<BookFormValues>({
        resolver: yupResolver(schemaUpdateInformation),
        defaultValues: {
            title: "",
            author: "",
            publishDate: undefined,
            description: "",
            price: "",
            stock: "",
            category: "",
            isPublish: "",
            isFeatured: "",
        }
    })


    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => CategoryService.getCategoryActive(),
        enabled: true
    })

    return {
        dataCategory,

        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        resetUpdateInformation,
        setValueUpdateInformation,
    }
}

export default useInfoTab
