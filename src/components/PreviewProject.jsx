import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PreviewProject({ project }) {
  const { auth } = useAuth()
  const { name, _id, client, owner } = project
  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="flex justify-between p-5">
          <p>{name} <span className="text-sm text-gray-300 uppercase">{''} {client}</span></p>
          {auth._id !== owner && (
            <p className="p-1 text-xs rounded-lg text-white bg-yellow-400 font-bold">{''} Colaborador</p>
          )}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 text-center md:mr-5 text-sm md:ml-auto font-bold"
      >Ver Proyecto</Link>
    </div>
  )
}
