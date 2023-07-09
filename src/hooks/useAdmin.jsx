import useProjects from "./useProjects"
import useAuth from "./useAuth"

export default function useAdmin() {
  const { project } = useProjects()
  const { auth } = useAuth()
 return project.owner === auth._id
}
