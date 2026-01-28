import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export interface BlogContentFormValues {
  content: string
}

const schemaUpdateContent = Yup.object().shape({
  content: Yup.string().required("Please input content").min(50, "Content must be at least 50 characters"),
})

const useContentTab = () => {
  const {
    control: controlUpdateContent,
    handleSubmit: handleSubmitUpdateContent,
    formState: { errors: errorsUpdateContent },
    reset: resetUpdateContent,
    setValue: setValueUpdateContent,
    watch: watchUpdateContent
  } = useForm<BlogContentFormValues>({
    resolver: yupResolver(schemaUpdateContent),
    defaultValues: {
      content: "",
    }
  })

  return {
    controlUpdateContent,
    handleSubmitUpdateContent,
    errorsUpdateContent,
    resetUpdateContent,
    setValueUpdateContent,
    watchUpdateContent,
  }
}

export default useContentTab