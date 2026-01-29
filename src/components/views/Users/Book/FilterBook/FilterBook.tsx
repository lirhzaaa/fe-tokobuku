import useChangeUrl from "@/src/hooks/useChangeUrl"
import useFilterBook from "./useFilterBook"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import { Autocomplete, AutocompleteItem, Skeleton } from "@heroui/react"
import { ICategory } from "@/src/types/Category"

const FilterBook = () => {
    const {
        control,
        setValue,
        dataCategory,
        isSuccessCategory,
    } = useFilterBook()

    const {
        currentCategory,
        handleChangeCategory,
    } = useChangeUrl()

    useEffect(() => {
        if (currentCategory !== "") {
            setValue("category", `${currentCategory}`)
        }
    }, [isSuccessCategory])

    if (!isSuccessCategory) {
        return <Skeleton className="w-[220px] h-14 rounded-xl" />
    }

    return (
        <Controller
            name="category"
            control={control}
            render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                    {...field}
                    className="w-70"
                    defaultSelectedKey={`${currentCategory}`}
                    defaultItems={dataCategory?.data.data || []}
                    label="Category"
                    placeholder="Select Category Book"
                    variant="bordered"
                    onSelectionChange={(value) => {
                        onChange(value)
                        handleChangeCategory(value !== null ? `${value}` : "")
                    }}
                >
                    {(category: ICategory) => (
                        <AutocompleteItem key={`${category._id}`}>
                            {category.name}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
            )}
        />
    )
}

export default FilterBook