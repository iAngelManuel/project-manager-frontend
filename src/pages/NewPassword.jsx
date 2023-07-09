import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import clientAxios from "../config/clientAxios"
import Alert from "../components/Alert"

export default function NewPassword() {
  const [ validToken, setValidToken ] = useState(false)
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')
  const [ alert, setAlert ] = useState({})
  const [ modified, setModified ] = useState(false)
  const { token } = useParams()

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forgot-password/${token}`)
        setValidToken(true)
      } catch (err) {
        setAlert({
          error: true,
          msg: err.data.response.message
        })
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if (password.length < 6) {
      return setAlert({
        error: true,
        msg: 'La contraseña debe tener al menos 6 caracteres'
      })
    }
    if (password.trim() === '' || password2.trim() === '') {
      return setAlert({
        error: true,
        msg: 'Los campos de contraseña son obligatorios'
      })
    }
    if (password !== password2) {
      return setAlert({
        error: true,
        msg: 'Las contraseñas no coinciden'
      })
    }
    setAlert({})
    try {
      const { data } = await clientAxios.post(`/users/forgot-password/${token}`, { password })
      setAlert({
        error: false,
        msg: data.message
      })
      setPassword('')
      setPassword2('')
      setModified(true)
    } catch (err) {
      setAlert({
        error: true,
        msg: err.data.response.message
      })
    }
  }
  const { msg } = alert
  return (
    <>
      <h1 className="text-purple-700 font-black text-5xl md:text-6xl capitalize">
        Reestablece tu contraseña para recuperar tu cuenta{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {validToken ? (
        <form
          className="my-10 bg-white shadow-lg rounded-lg p-5 md:p-10"
          autoComplete="false"
          noValidate
          onSubmit={handleSubmit}>
          {msg && <Alert alert={alert} setAlert={setAlert} />}
          <div className="my-5">
            <label
              htmlFor="password"
              className="text-gray-600 block tex-xl font-bold mb-2">
              Nueva contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Escribe tu nueva contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-gray-200 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password2"
              className="text-gray-600 block tex-xl font-bold mb-2">
              Repite tu password
            </label>
            <input
              type="password"
              id="password2"
              placeholder="Repita su nueva contraseña"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              className="border border-gray-200 rounded-md px-4 py-2 w-full"
            />
          </div>
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg w-full cursor-pointer mb-10"
          />
        </form>
      ) : (
        <div className="my-10 bg-white shadow-lg rounded-lg p-5 md:p-10">
          <h2 className="text-2xl font-bold text-gray-700">
            El token no es válido o ha expirado
          </h2>
          <p className="text-gray-600">
            Por favor, solicita un nuevo token para reestablecer tu contraseña
          </p>
          <Link
            to="/forget-password"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg w-full cursor-pointer mt-5 inline-block text-center">
            Solicitar nuevo token
          </Link>
        </div>
      )}
      {modified && (
        <div className="mt-20 md:mt-5 shadow-lg px-10 py-10 rounded-lg bg-white">
          <Link
            to="/"
            className="inline-block text-purple-700 hover:text-purple-800 font-bold text-center">
            Inicia Sesión
          </Link>
        </div>
      )}
    </>
  )
}
