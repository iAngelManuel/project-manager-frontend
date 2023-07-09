import useProjects from "../hooks/useProjects"
import useAdmin from "../hooks/useAdmin"
import { dateFormated } from "../helpers/dateFormated"

export default function Task({ task }) {
  const { name, description, priority, finallyDate, status, _id } = task
  const { handleEditTask, handleDeleteTask, handleCompleteTask } = useProjects()
  const admin = useAdmin()
  return (
    <div className="border-b p-5 flex justify-between items-center gap-5">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-2xl font-bold">{name}</p>
        <p className="mb-1 text-sm">{description}</p>
        <p className="mb-1 text-sm">{dateFormated(finallyDate)}</p>
        <p className="mb-1 text-sm font-bold">Prioridad: <span className="font-normal">{priority}</span></p>
        {status && <p className="mb-1 text-sm font-bold">Completada por: <span className="font-normal">{task.completed.name}</span></p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-1">
        {admin && (
          <button
            type="button"
            onClick={() => handleEditTask(task)}
            className="bg-purple-600 hover:bg-purple-800 transition-colors px-2 py-1 rounded-lg text-white font-bold"
          >Editar</button>
        )}
        <button
          type="button"
          onClick={() => handleCompleteTask(_id)}
          className={`${status ? 'bg-sky-500 hover:bg-sky-600' : 'bg-gray-600 hover:bg-gray-700'} transition-colors px-2 py-1 rounded-lg text-white font-bold`}
        >{status ? 'Completa' : 'Incompleta'}</button>
        {admin && (
          <button
            type="button"
            onClick={() => handleDeleteTask(task)}
            className="bg-red-500 hover:bg-red-600 transition-colors px-2 py-1 rounded-lg text-white font-bold"
          >Eliminar</button>
        )}
      </div>
    </div>
  )
}
