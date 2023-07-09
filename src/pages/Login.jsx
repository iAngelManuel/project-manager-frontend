import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import clientAxios from "../config/clientAxios"
import useAuth from "../hooks/useAuth"
import Alert from "../components/Alert"

export default function Login() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alert, setAlert ] = useState({})
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/projects')
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    if ([ email, password ].includes('')) {
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
    setAlert({})
    setEmail('')
    setPassword('')
    try {
      const { data } = await clientAxios.post('/users/login', {
        email,
        password
      })
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/projects')
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
        Inicia sesión y empieza a administrar tus{" "}
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-200 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-600 block tex-xl font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="*********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-200 rounded-md px-4 py-2 w-full"
          />
        </div>
        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg w-full cursor-pointer mb-10"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/register"
          className="inline-block text-purple-700 hover:text-purple-800 font-bold">
          ¿No tienes cuenta?
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
