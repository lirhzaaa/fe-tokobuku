import { Tab, Tabs } from "@heroui/react"
import ImageTab from "./ImageTab"
import InfoTab from "./InfoTab"
import useDetailBlog from "./useDetailBlog"
import ContentTab from "./ContentTab"

const DetailBlog = () => {
    const {
        dataBlog,

        handleUpdateBlogInfo,
        handleUpdateBlogImage,
        isPendingMutateUpdateBlog,
        isSuccessMutateUpdateBlog,
    } = useDetailBlog()

    return (
        <Tabs aria-label="Options Detail Category">
            <Tab key="image" title="Image">
                <ImageTab
                    currentImage={dataBlog?.image}
                    onUpdate={handleUpdateBlogImage}
                    isPendingUpdateBlog={isPendingMutateUpdateBlog}
                    isSuccessUpdateBlog={isSuccessMutateUpdateBlog}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataBlog={dataBlog}
                    onUpdate={handleUpdateBlogInfo}
                    isPendingUpdateBlog={isPendingMutateUpdateBlog}
                    isSuccessUpdateBlog={isSuccessMutateUpdateBlog} />
            </Tab>
            <Tab key="content" title="Content">
                <ContentTab
                    dataBlog={dataBlog}
                    onUpdate={handleUpdateBlogInfo}
                    isPendingUpdateBlog={isPendingMutateUpdateBlog}
                    isSuccessUpdateBlog={isSuccessMutateUpdateBlog} />
            </Tab>
        </Tabs>
    )
}

export default DetailBlog