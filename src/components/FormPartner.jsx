import { useState } from "react"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"

export default function FormPartner() {
  const [ email, setEmail ] = useState('')
  const { alert, setAlert, submitPartner } = useProjects()

  const handleSubmit = async e => {
    e.preventDefault()
    if (email === '') {
      return setAlert({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
    }
    setAlert({})
    await submitPartner(email)
    setEmail('')
  }
  const { msg } = alert
  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 w-full md:w-1/2 rounded-lg shadow-lg">
      {msg && <Alert alert={alert} setAlert={setAlert}/>}
      <div className="mb-5 space-y-2">
        <label htmlFor="email" className="font-bold text-sm text-gray-600">Buscar colaborador por email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email del Colaborador"
          className="bg-gray-100 border-2 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <input
        type="submit"
        value="Añadir Colaborador"
        className="font-bold w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 cursor-pointer"
      />
    </form>
  )
}
