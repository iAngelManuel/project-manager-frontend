import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Sidebar() {
  const { auth } = useAuth()
  return (
    <aside className="bg-white md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hola {auth.name}</p>
      <nav className="mt-5">
        <Link
          to="create-project"
          className="bg-purple-600 w-full font-bold text-white px-4 py-2 rounded-lg"
        >Crear Proyecto</Link>
      </nav>
    </aside>
  )
}
