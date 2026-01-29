import AuthService from "@/src/services/auth.service"
import { useQuery } from "@tanstack/react-query"

const useDashboardLayoutClient = () => {
    const getProfile = async () => {
        const { data } = await AuthService.findProfile()
        return data.data
    }

    const { data: dataProfile } = useQuery({
        queryKey: ['Profile'],
        queryFn: getProfile,
        enabled: true
    })

    return {
        dataProfile,
    }
}

export default useDashboardLayoutClient