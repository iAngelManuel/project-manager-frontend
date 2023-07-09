import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import useProjects from '../hooks/useProjects'
import Alert from './Alert'

const PRIORITIES = [ 'Baja', 'Media', 'Alta' ]

export default function TaskFormModal() {
  const [ id, setId ] = useState('')
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ finallyDate, setFinallyDate ] = useState('')
  const [ priority, setPriority ] = useState('')

  const params = useParams()
  const { alert, showAlert, setAlert, taskFormModal, handleTaskFormModal, submitTask, task } = useProjects()

  useEffect(() => {
    if (task?._id) {
      setId(task._id || '')
      setName(task.name || '')
      setDescription(task.description || '')
      setFinallyDate(task.finallyDate.split('T')[0] || '')
      setPriority(task.priority || '')
    }
  }, [task])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([ name, description, finallyDate, priority ].includes('')) {
      return showAlert({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
    }
    await submitTask({id, name, description, finallyDate, priority, project: params.id })
    setId('')
    setName('')
    setDescription('')
    setFinallyDate('')
    setPriority('')
  }
  const { msg } = alert
  return (
    <Transition.Root show={taskFormModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleTaskFormModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleTaskFormModal}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900">
                      {id ? 'Editar tarea' : 'Nueva tarea'}
                    </Dialog.Title>
                    <form className="my-10" onSubmit={handleSubmit}>
                      {msg && <Alert alert={alert} setAlert={setAlert} />}
                      <div className="mb-5">
                        <label htmlFor="name" className="text-gray-700 uppercase font-bold text-sm">Nombre de la tarea</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Escriba el nombre de la tarea"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="description" className="text-gray-700 uppercase font-bold text-sm">Descripción de la tarea</label>
                        <textarea
                          type="text"
                          id="description"
                          placeholder="Escriba la descripción de la tarea"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="date" className="text-gray-700 uppercase font-bold text-sm">Descripción de la tarea</label>
                        <input
                          type="date"
                          id="date"
                          value={finallyDate}
                          onChange={e => setFinallyDate(e.target.value)}
                          className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="priority" className="text-gray-700 uppercase font-bold text-sm">Prioridad</label>
                        <select
                          type="text"
                          id="priority"
                          value={priority}
                          onChange={e => setPriority(e.target.value)}
                          className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                        >
                          <option value="">-- Seleccione --</option>
                          {PRIORITIES.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="submit"
                        value={id ? 'Actualizar tarea' : 'Agregar tarea'}
                        className="bg-purple-600 hover:bg-purple-800 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer rounded-lg shadow-lg transition-colors duration-300"
                      />
                    </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
