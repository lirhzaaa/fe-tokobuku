import { Button, Card, CardBody, CardHeader, Chip, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import useInfoTab, { BlogInfoFormValues } from "./useInfoTab"
import { IBlog } from "@/src/types/Blog"

interface IInfoTypes {
    dataBlog?: IBlog
    onUpdate: (data: BlogInfoFormValues) => void
    isPendingUpdateBlog: boolean
    isSuccessUpdateBlog: boolean
}

const InfoTab = (props: IInfoTypes) => {
    const { dataBlog, onUpdate, isPendingUpdateBlog, isSuccessUpdateBlog } = props
    const {
        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        setValueUpdateInformation,
        resetUpdateInformation,
    } = useInfoTab()

    const [tagInput, setTagInput] = useState("")

    useEffect(() => {
        if (dataBlog) {
            setValueUpdateInformation('title', `${dataBlog.title}`)
            setValueUpdateInformation('slug', `${dataBlog.slug}`)
            setValueUpdateInformation('excerpt', `${dataBlog.excerpt}`)
            setValueUpdateInformation('author', `${dataBlog.author}`)
            setValueUpdateInformation('tags', dataBlog.tags || [])
            setValueUpdateInformation('isPublish', `${dataBlog.isPublish}`)
            setValueUpdateInformation('isFeatured', `${dataBlog.isFeatured}`)
        }
    }, [dataBlog, setValueUpdateInformation])

    useEffect(() => {
        if (isSuccessUpdateBlog) {
            resetUpdateInformation()
        }
    }, [isSuccessUpdateBlog, resetUpdateInformation])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Blog Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this blog</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInformation(onUpdate)}>
                    <Skeleton isLoaded={!!dataBlog?.title} className="rounded-lg">
                        <Controller
                            name="title"
                            control={controlUpdateInformation}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Title"
                                    placeholder="Enter blog title"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isInvalid={!!errorsUpdateInformation.title}
                                    errorMessage={errorsUpdateInformation.title?.message}
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataBlog?.slug} className="rounded-lg">
                        <Controller
                            name="slug"
                            control={controlUpdateInformation}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Slug"
                                    placeholder="blog-post-url-slug"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    description="URL-friendly version of the title"
                                    isInvalid={!!errorsUpdateInformation.slug}
                                    errorMessage={errorsUpdateInformation.slug?.message}
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataBlog?.excerpt} className="rounded-lg">
                        <Controller
                            name="excerpt"
                            control={controlUpdateInformation}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Excerpt"
                                    placeholder="Short description (10-300 characters)"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    maxRows={3}
                                    isInvalid={!!errorsUpdateInformation.excerpt}
                                    errorMessage={errorsUpdateInformation.excerpt?.message}
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={dataBlog?.author !== undefined} className="rounded-lg">
                        <Controller
                            name="author"
                            control={controlUpdateInformation}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Author (Optional)"
                                    placeholder="Author name"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isInvalid={!!errorsUpdateInformation.author}
                                    errorMessage={errorsUpdateInformation.author?.message}
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={dataBlog?.tags !== undefined} className="rounded-lg">
                        <Controller
                            name="tags"
                            control={controlUpdateInformation}
                            render={({ field }) => (
                                <div className="flex flex-col gap-2">
                                    <Input
                                        label="Tags"
                                        labelPlacement="outside"
                                        placeholder="Type and press Enter to add tag"
                                        variant="bordered"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                if (tagInput.trim() && !field.value?.includes(tagInput.trim())) {
                                                    field.onChange([...(field.value || []), tagInput.trim()])
                                                    setTagInput("")
                                                }
                                            }
                                        }}
                                        isInvalid={!!errorsUpdateInformation.tags}
                                        errorMessage={errorsUpdateInformation.tags?.message}
                                    />

                                    {field.value && field.value.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {field.value.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    onClose={() => {
                                                        const newTags = field.value?.filter((_, i) => i !== index)
                                                        field.onChange(newTags)
                                                    }}
                                                    variant="flat"
                                                    color="primary"
                                                >
                                                    {tag}
                                                </Chip>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={dataBlog?.isPublish !== undefined} className="rounded-lg">
                        <Controller
                            name="isPublish"
                            control={controlUpdateInformation}
                            render={({ field: { onChange, value, ...field } }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    placeholder="Select status"
                                    selectedKeys={value !== undefined ? [String(value)] : []}
                                    onSelectionChange={(keys) => {
                                        const selected = Array.from(keys)[0]
                                        onChange(selected === "true")
                                    }}
                                    disallowEmptySelection
                                    isInvalid={!!errorsUpdateInformation.isPublish}
                                    errorMessage={errorsUpdateInformation.isPublish?.message}
                                >
                                    <SelectItem key="true">Published</SelectItem>
                                    <SelectItem key="false">Draft</SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={dataBlog?.isFeatured !== undefined} className="rounded-lg">
                        <Controller
                            name="isFeatured"
                            control={controlUpdateInformation}
                            render={({ field: { onChange, value, ...field } }) => (
                                <Select
                                    {...field}
                                    label="Featured"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    placeholder="Select featured status"
                                    selectedKeys={value !== undefined ? [String(value)] : []}
                                    onSelectionChange={(keys) => {
                                        const selected = Array.from(keys)[0]
                                        onChange(selected === "true")
                                    }}
                                    disallowEmptySelection
                                    isInvalid={!!errorsUpdateInformation.isFeatured}
                                    errorMessage={errorsUpdateInformation.isFeatured?.message}
                                >
                                    <SelectItem key="true">Featured</SelectItem>
                                    <SelectItem key="false">Not Featured</SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>

                    <Button
                        color="primary"
                        type="submit"
                        className="mt-2"
                        disabled={isPendingUpdateBlog || !dataBlog?._id}>
                        {isPendingUpdateBlog ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab