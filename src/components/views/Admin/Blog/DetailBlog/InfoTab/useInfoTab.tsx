import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export interface BlogInfoFormValues {
    title: string
    slug: string
    excerpt: string
    author: string
    tags: string[]
    isPublish: string
    isFeatured: string
}

const schemaUpdateInformation = Yup.object().shape({
    title: Yup.string().required("Please input title").min(3).max(200),
    slug: Yup.string()
        .required("Please input slug")
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
    excerpt: Yup.string().required("Please input excerpt").min(10).max(300),
    author: Yup.string().required().default(""),
    tags: Yup.array()
        .of(Yup.string().required())
        .min(1, "Please input at least one tag")
        .required("Please input tags"),
    isPublish: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select featured status"),
})

const useInfoTab = () => {
    const {
        control: controlUpdateInformation,
        handleSubmit: handleSubmitUpdateInformation,
        formState: { errors: errorsUpdateInformation },
        reset: resetUpdateInformation,
        setValue: setValueUpdateInformation
    } = useForm<BlogInfoFormValues>({
        resolver: yupResolver(schemaUpdateInformation),
        defaultValues: {
            title: "",
            slug: "",
            excerpt: "",
            author: "",
            tags: [],
            isPublish: "false",
            isFeatured: "false",
        }
    })

    return {
        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        resetUpdateInformation,
        setValueUpdateInformation,
    }
}

export default useInfoTab