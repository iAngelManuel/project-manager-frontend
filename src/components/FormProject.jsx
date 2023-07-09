import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Alert from './Alert'

export default function FormProject() {
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ finallyDate, setFinallyDate] = useState('')
  const [ client, setClient ] = useState('')
  const [ id, setId ] = useState(null)

  const { alert, setAlert, showAlert, getProjects, project } = useProjects()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      setId(project._id)
      setName(project.name)
      setDescription(project.description)
      setFinallyDate(project.finallyDate?.split('T')[0])
      setClient(project.client)
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, description, finallyDate, client].includes('')) {
      return showAlert({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
    }
    await getProjects({ id, name, description, finallyDate, client })
    setId(null)
    setName('')
    setDescription('')
    setFinallyDate('')
    setClient('')
  }
  const { msg } = alert
  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      {msg && <Alert alert={alert} setAlert={setAlert} />}
      <div className="mb-5">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
        <input
          type="text"
          id="name"
          placeholder="Nombre del Proyecto"
          value={name}
          onChange={e => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
        <textarea
          type="text"
          id="description"
          placeholder="Descripción del Proyecto"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="finally-date" className="block text-gray-700 text-sm font-bold mb-2">Fecha de entrega</label>
        <input
          type="date"
          id="finally-date"
          value={finallyDate}
          onChange={e => setFinallyDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="client" className="block text-gray-700 text-sm font-bold mb-2">Cliente</label>
        <input
          type="text"
          id="client"
          placeholder="Nombre del Cliente"
          value={client}
          onChange={e => setClient(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <input
        type="submit"
        value={id ? 'Editar Proyecto' : 'Crear Proyecto'}
        className="bg-purple-600 hover:bg-purple-700 transition-colors w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer"
      />
    </form>
  )
}
