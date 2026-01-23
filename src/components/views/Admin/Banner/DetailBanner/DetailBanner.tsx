import { Tab, Tabs } from "@heroui/react"
import ImageTab from "./ImageTab"
import InfoTab from "./InfoTab"
import useDetailBanner from "./useDetailBanner"

const DetailBanner = () => {
    const {
        dataBanner,

        handleUpdateBanner,
        isPendingMutateUpdateBanner,
        isSuccessMutateUpdateBanner,
    } = useDetailBanner()

    return (
        <Tabs aria-label="Options Detail Category">
            <Tab key="icon" title="Icon">
                <ImageTab
                    currentImage={dataBanner?.image}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdateBanner={isPendingMutateUpdateBanner}
                    isSuccessUpdateBanner={isSuccessMutateUpdateBanner}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataBanner={dataBanner}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdateBanner={isPendingMutateUpdateBanner}
                    isSuccessUpdateBanner={isSuccessMutateUpdateBanner} />
            </Tab>
        </Tabs>
    )
}

export default DetailBanner
