import { useState } from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import Alert from '../components/Alert'

export default function ForgetPassword() {
  const [ email, setEmail ] = useState('')
  const [ alert, setAlert ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    if (email === '') {
      return setAlert({
        error: true,
        msg: 'El campo email es obligatorio'
      })
    }
    if (!validEmail.test(email)) {
      return setAlert({
        error: true,
        msg: 'El email no es válido'
      })
    }
    try {
      const { data } = await clientAxios.post('/users/forgot-password', {
        email
      })
      setAlert({
        error: false,
        msg: data.message
      })
    } catch (err) {
      setAlert({
        error: true,
        msg: err.response.data.message
      })
    }
  }
  const { msg } = alert
  return (
    <>
      <h1 className="text-purple-700 font-black text-5xl md:text-6xl capitalize">
        Recupera tu acceso para que no pierdas tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <form
        className="my-10 bg-white shadow-lg rounded-lg p-5 md:p-10"
        autoComplete="false"
        noValidate
        onSubmit={handleSubmit}>
        {msg && <Alert alert={alert} setAlert={setAlert} />}
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-600 block tex-xl font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ej. correo@correo.com"
            className="border border-gray-200 rounded-md px-4 py-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Recuperar acceso"
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg w-full cursor-pointer mb-10"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="inline-block text-purple-700 hover:text-purple-800 font-bold">
          ¿Ya tienes cuenta?
        </Link>
        <Link
          to="/register"
          className="inline-block text-purple-700 hover:text-purple-800 font-bold">
          ¿No tienes cuenta?
        </Link>
      </nav>
    </>
  )
}
