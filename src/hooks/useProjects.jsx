import { useContext } from 'react'
import { ProjectsContext } from '../context/ProjectsProvider'

export default function useProjects() {
  return useContext(ProjectsContext)
}
