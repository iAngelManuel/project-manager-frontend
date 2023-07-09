import { useState } from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import Alert from '../components/Alert'

export default function Register() {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repitPassword, setRepitPassword ] = useState('')
  const [ alert, setAlert ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    if ([ name, email, password, repitPassword ].includes('')) {
      return setAlert({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
    }
    if (!validEmail.test(email)) {
      return setAlert({
        error: true,
        msg: 'El email no es válido'
      })
    }
    if (password !== repitPassword) {
      return setAlert({
        error: true,
        msg: 'Las contraseñas no coinciden'
      })
    }
    if (password.length < 6) {
      return setAlert({
        error: true,
        msg: 'La contraseña debe tener al menos 6 caracteres'
      })
    }
    setAlert({})
    try {
      const { data } = await clientAxios.post('/users', {
        name,
        email,
        password
      })
      setAlert({
        error: false,
        msg: data.message
      })
      setName('')
      setEmail('')
      setPassword('')
      setRepitPassword('')
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
        Crea tu cuenta para empezar a administrar tus{" "}
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
            htmlFor="name"
            className="text-gray-600 block text-xl font-bold">
            Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Ej. Angel"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-200 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-600 block text-xl font-bold">
            Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ej. correo@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-200 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 block text-xl font-bold mb-2">
            Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Almacenaremos tu contraseña de forma segura"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-200 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="text-gray-600 block text-xl font-bold mb-2">
            Repite tu password</label>
          <input
            type="password"
            id="password2"
            placeholder="Repita su contraseña"
            value={repitPassword}
            onChange={e => setRepitPassword(e.target.value)}
            className="border border-gray-200 rounded-md px-4 py-2 w-full"
          />
        </div>
        <input
          type="submit"
          value="Crear cuenta"
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
          to="/forget-password"
          className="inline-block text-purple-700 hover:text-purple-800 font-bold">
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  )
}
