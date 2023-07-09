import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProjects from "../hooks/useProjects"
import SearchProjectModal from "./SearchProjectModal"

export default function Header() {
  const { logout } = useAuth()
  const { handleSearching, finishSession } = useProjects()

  const handleLogOut = () => {
    finishSession()
    logout()
    localStorage.removeItem('token')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between md:items-center md:gap-4">
        <h2 className="text-4xl text-center md:text-left text-purple-600 font-bold mb-5 md:mb-0">Project Managment</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <button
            type="button"
            onClick={handleSearching}
            className="text-center font-bold px-4 py-2 rounded-lg"
          >Buscar Proyecto</button>
          <Link 
            to="/projects"
            className="bg-purple-600 hover:bg-purple-700 text-white text-center px-4 py-2 rounded-lg"
          >Proyectos</Link>
          <button
            type="button"
            onClick={handleLogOut}
            className="text-slate-700 px-4 py-2 rounded-lg ml-2"
          >Cerrar Sesión</button>
          <SearchProjectModal />
        </div>
      </div>
    </header>
  )
}
