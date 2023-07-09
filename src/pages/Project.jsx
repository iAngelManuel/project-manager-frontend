import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import useAdmin from "../hooks/useAdmin"
import TaskFormModal from "../components/TaskFormModal"
import DeleteTaskModal from "../components/DeleteTaskModal"
import DeletePartnerModal from "../components/DeletePartnerModal"
import Task from "../components/Task"
import Partner from "../components/Partner"
import io from "socket.io-client"

let socket

export default function Project() {
  const { id } = useParams()
  const { getProject, project, loading, handleTaskFormModal, submitTaskProject, deleteTaskProject, editTaskProject, changeChangeStatus } = useProjects()
  const admin = useAdmin()

  useEffect(() => {
    getProject(id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BE_URL)
    socket.emit('open-project', id)
  }, [])

  useEffect(() => {
    socket.on('task-send', newTask => {
      if (newTask.project === project._id) {
        submitTaskProject(newTask)
      }
    })

    socket.on('task-deleted', taskDeleted => {
      console.log(taskDeleted)
      if (taskDeleted.project === project._id) {
        deleteTaskProject(taskDeleted)
      }
    })

    socket.on('task-updated', taskEdited => {
      console.log(taskEdited)
      if (taskEdited.project._id === project._id) {
        editTaskProject(taskEdited)
      }
    })

    socket.on('status-changed', changedStatus => {
      if (changedStatus.project._id === project._id) {
        changeChangeStatus(changedStatus)
      }
    })
  })

  const { name } = project
  if (loading) return <p className="text-center mt-10">Cargando...</p>
  return (
    <>
      <h1 className="text-4xl font-bold">{name}</h1>
      {admin && (
        <div className="flex justify-end">
          <Link
            to={`/projects/edit/${id}`}
            className="flex gap-2 text-gray-700 hover:text-gray-950 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Editar
          </Link>
        </div>
      )}
      {admin && (
        <button
          type="button"
          onClick={handleTaskFormModal}
          className="bg-purple-500 hover:bg-purple-600 flex gap-2 justify-center items-center text-white text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
            />
          </svg>
          Nueva tarea
        </button>
      )}
      <p className="font-bold text-xl my-10">Tareas del Proyecto</p>
      <div className="bg-white rounded-lg shadow-lg">
        {project.tasks?.length ?
          project.tasks?.map(task => (
            <Task key={task._id} task={task} />
          )) :
          <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>
        }
      </div>
      {admin && (
        <>
          <div className="flex justify-between items-center font-bold text-xl mt-10">
            <p className="text-center text-xl font-bold">Colaboradores</p>
            <Link
              to={`/projects/new-collaborator/${id}`}
              className="bg-purple-600 transition-colors hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg uppercase font-bold"
            >Añadir</Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg mt-5">
            {project?.partners?.length ?
              project?.partners?.map(p => (
                <Partner
                  key={p._id}
                  p={p}
                />
              )) :
              <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>
            }
          </div>
        </>
      )}
      <TaskFormModal />
      <DeleteTaskModal />
      <DeletePartnerModal />
    </>
  )
}
