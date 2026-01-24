import { Tab, Tabs } from "@heroui/react"
import ImageTab from "./ImageTab"
import InfoTab from "./InfoTab"
import useDetailBook from "./useDetailBook"

const DetailBook = () => {
    const {
        dataBook,

        handleUpdateBook,
        isPendingMutateUpdateBook,
        isSuccessMutateUpdateBook,
    } = useDetailBook()

    return (
        <Tabs aria-label="Options Detail Category">
            <Tab key="image" title="Image">
                <ImageTab
                    currentImage={dataBook?.image}
                    onUpdate={handleUpdateBook}
                    isPendingUpdateBook={isPendingMutateUpdateBook}
                    isSuccessUpdateBook={isSuccessMutateUpdateBook}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataBook={dataBook}
                    onUpdate={handleUpdateBook}
                    isPendingUpdateBook={isPendingMutateUpdateBook}
                    isSuccessUpdateBook={isSuccessMutateUpdateBook} />
            </Tab>
        </Tabs>
    )
}

export default DetailBook
