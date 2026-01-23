import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

const schemaUpdateInformation = Yup.object().shape({
    title: Yup.string().required("Please input title"),
    isShow: Yup.string().required("Please select isShow"),
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
