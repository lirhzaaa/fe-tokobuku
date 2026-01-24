import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import useInfoTab from "./useInfoTab"
import { IBook } from "@/src/types/Book"
import { ICategory } from "@/src/types/Category"

export interface IBooks {
    _id?: string;
    title: string;
    author: string;
    description: string;
    price: string;
    stock: string;
    category: ICategory;
    isActive: string;
    isFeatured: string;
}

interface IInfoTypes {
    dataBook: IBooks
    onUpdate: (data: Partial<IBook>) => void
    isPendingUpdateBook: boolean
    isSuccessUpdateBook: boolean
}

const InfoTab = (props: IInfoTypes) => {
    const { dataBook, onUpdate, isPendingUpdateBook, isSuccessUpdateBook } = props
    const {
        dataCategory,

        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        setValueUpdateInformation,
        resetUpdateInformation,
    } = useInfoTab()

    useEffect(() => {
        if (dataBook) {
            setValueUpdateInformation('title', `${dataBook?.title}`)
            setValueUpdateInformation('author', `${dataBook?.author}`)
            setValueUpdateInformation('description', `${dataBook?.description}`)
            setValueUpdateInformation('price', `${dataBook?.price}`)
            setValueUpdateInformation('stock', `${dataBook?.stock}`)
            setValueUpdateInformation('category', `${dataBook?.category?._id}`)
            setValueUpdateInformation('isActive', `${dataBook?.isActive}`)
            setValueUpdateInformation('isFeatured', `${dataBook?.isFeatured}`)
        }

    }, [dataBook])

    useEffect(() => {
        if (isSuccessUpdateBook) {
            resetUpdateInformation()
        }
    }, [isSuccessUpdateBook])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Book Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this Book</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInformation(onUpdate)}>
                    <Skeleton isLoaded={!!dataBook?.title} className="rounded-lg">
                        <Controller name="title" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Title"
                                placeholder="Please Input Title For Book"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataBook?.title}
                                isInvalid={errorsUpdateInformation.title !== undefined}
                                errorMessage={errorsUpdateInformation.title?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBook?.author} className="rounded-lg">
                        <Controller name="author" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Author"
                                placeholder="Please Input author For Book"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataBook?.author}
                                isInvalid={errorsUpdateInformation.author !== undefined}
                                errorMessage={errorsUpdateInformation.author?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBook?.price} className="rounded-lg">
                        <Controller name="price" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Price"
                                placeholder="Please Input price For Book"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataBook?.price}
                                isInvalid={errorsUpdateInformation.price !== undefined}
                                errorMessage={errorsUpdateInformation.price?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBook?.stock} className="rounded-lg">
                        <Controller name="stock" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Stock"
                                placeholder="Please Input stock For Book"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataBook?.stock}
                                isInvalid={errorsUpdateInformation.stock !== undefined}
                                errorMessage={errorsUpdateInformation.stock?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBook?.category !== undefined} className="rounded-lg">
                        <Controller name="category" control={controlUpdateInformation} render={({ field: { onChange, ...field } }) => (
                            <Autocomplete
                                {...field}
                                label="Category"
                                labelPlacement="outside"
                                placeholder="Please Select Category"
                                variant="bordered"
                                defaultItems={dataCategory?.data?.data ?? []}
                                defaultSelectedKey={dataBook?.category?._id}
                                isInvalid={errorsUpdateInformation.category !== undefined}
                                errorMessage={errorsUpdateInformation.category?.message}
                                onSelectionChange={(value) => onChange(value)}
                            >
                                {(category: ICategory) => (
                                    <AutocompleteItem key={`${category?._id}`}>
                                        {category?.name}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBook?.isActive !== undefined} className="rounded-lg">
                        <Controller name="isActive" control={controlUpdateInformation} render={({ field }) => (
                            <Select
                                {...field}
                                label="Status"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Select Status"
                                disallowEmptySelection
                                isInvalid={errorsUpdateInformation.isActive !== undefined}
                                errorMessage={errorsUpdateInformation.isActive?.message}
                                defaultSelectedKeys={[dataBook?.isActive ? "true" : "false"]}>
                                <SelectItem key="true" textValue="Publish">Publish</SelectItem>
                                <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                            </Select>
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBook?.isFeatured !== undefined} className="rounded-lg">
                        <Controller name="isFeatured" control={controlUpdateInformation} render={({ field }) => (
                            <Select
                                {...field}
                                label="Featured"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Select Featured"
                                disallowEmptySelection
                                isInvalid={errorsUpdateInformation.isFeatured !== undefined}
                                errorMessage={errorsUpdateInformation.isFeatured?.message}
                                defaultSelectedKeys={[dataBook?.isFeatured ? "true" : "false"]}>
                                <SelectItem key="true" textValue="Active">Active</SelectItem>
                                <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                            </Select>
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBook?.description} className="rounded-lg">
                        <Controller name="description" control={controlUpdateInformation} render={({ field }) => (
                            <Textarea
                                {...field}
                                label="Description"
                                placeholder="Please Input description For Book"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataBook?.description}
                                isInvalid={errorsUpdateInformation.description !== undefined}
                                errorMessage={errorsUpdateInformation.description?.message}
                            />
                        )} />
                    </Skeleton>
                    <Button color="primary" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingUpdateBook || !dataBook?._id}>
                        {isPendingUpdateBook ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab
