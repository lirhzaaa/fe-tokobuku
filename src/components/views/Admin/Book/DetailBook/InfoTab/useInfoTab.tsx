import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import CategoryService from "@/src/services/category.service"
import { useQuery } from "@tanstack/react-query"

const schemaUpdateInformation = Yup.object().shape({
    title: Yup.string().required("Please input title"),
    author: Yup.string().required("Please input author"),
    description: Yup.string().required("Please input description"),
    price: Yup.string().required("Please input price"),
    stock: Yup.string().required("Please input stock"),
    category: Yup.string().required("Please select category"),
    isActive: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select status"),
})

const useInfoTab = () => {
    const {
        control: controlUpdateInformation,
        handleSubmit: handleSubmitUpdateInformation,
        formState: { errors: errorsUpdateInformation },
        reset: resetUpdateInformation,
        setValue: setValueUpdateInformation
    } = useForm({
        resolver: yupResolver(schemaUpdateInformation),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            isActive: "",
            isFeatured: "",
        }
    })


    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => CategoryService.getCategory(),
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
