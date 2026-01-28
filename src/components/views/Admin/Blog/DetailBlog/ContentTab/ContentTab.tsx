import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import useContentTab, { BlogContentFormValues } from "./useContentTab"
import { IBlog } from "@/src/types/Blog"
import RichTextEditor from "@/src/components/ui/RichTextEditor/RichTextEditor"

interface IContentTypes {
    dataBlog?: IBlog
    onUpdate: (data: BlogContentFormValues) => void
    isPendingUpdateBlog: boolean
    isSuccessUpdateBlog: boolean
}

const ContentTab = (props: IContentTypes) => {
    const { dataBlog, onUpdate, isPendingUpdateBlog, isSuccessUpdateBlog } = props
    const {
        controlUpdateContent,
        handleSubmitUpdateContent,
        errorsUpdateContent,
        setValueUpdateContent,
        resetUpdateContent,
        watchUpdateContent,
    } = useContentTab()

    useEffect(() => {
        if (dataBlog?.content) {
            setValueUpdateContent('content', dataBlog.content)
        }
    }, [dataBlog, setValueUpdateContent])

    useEffect(() => {
        if (isSuccessUpdateBlog) {
            resetUpdateContent()
        }
    }, [isSuccessUpdateBlog, resetUpdateContent])

    const currentContent = watchUpdateContent('content')
    const contentLength = currentContent?.replace(/<[^>]*>/g, '').length || 0

    return (
        <Card className="w-full p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Blog Content</h3>
                <p className="w-full text-small text-default-400">Edit the main content of this blog post</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateContent(onUpdate)}>
                    <Skeleton isLoaded={!!dataBlog?.content || dataBlog?.content === ''} className="rounded-lg">
                        <div className="flex flex-col gap-2">
                            <Controller
                                name="content"
                                control={controlUpdateContent}
                                render={({ field: { onChange, value } }) => (
                                    <RichTextEditor
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Write your blog content here..."
                                        isInvalid={!!errorsUpdateContent.content}
                                        errorMessage={errorsUpdateContent.content?.message}
                                    />
                                )}
                            />

                            <div className="flex justify-between items-center text-xs text-default-400">
                                <span>
                                    {contentLength} characters (minimum 50)
                                </span>
                                {contentLength < 50 && (
                                    <span className="text-danger">
                                        {50 - contentLength} more characters needed
                                    </span>
                                )}
                            </div>
                        </div>
                    </Skeleton>

                    {currentContent && (
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold mb-2 text-default-600">Preview:</h4>
                            <div className="border border-default-200 rounded-lg p-4 bg-default-50">
                                <div
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: currentContent }}
                                />
                            </div>
                        </div>
                    )}

                    <Button
                        color="primary"
                        type="submit"
                        className="mt-2"
                        disabled={isPendingUpdateBlog || !dataBlog?._id || contentLength < 50}
                    >
                        {isPendingUpdateBlog ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Content"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default ContentTab