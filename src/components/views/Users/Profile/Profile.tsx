"use client"

import { Tab, Tabs } from "@heroui/react"
import PictureTab from "./PictureTab"
import useProfile from "./useProfile"
import InfoTab from "./InfoTab"
import SecurityTab from "./SecurityTab"

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,

    isPendingMutateProfile,
    isSuccessMutateProfile,
  } = useProfile()

  return (
    <Tabs>
      <Tab key="profile" title="Cover">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateProfile}
          isSuccessUpdate={isSuccessMutateProfile}
        />
      </Tab>

      <Tab key="info" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateProfile}
          isSuccessUpdate={isSuccessMutateProfile}
        />
      </Tab>

      <Tab key="password" title="Password">
        <SecurityTab />
      </Tab>
    </Tabs>
  )
}

export default Profile