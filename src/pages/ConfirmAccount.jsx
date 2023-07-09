import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import clientAxios from '../config/clientAxios'
import Alert from "../components/Alert"

export default function ConfirmAccount() {
  const [alert, setAlert] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clientAxios(`/users/confirm/${id}`)
        setAlert({
          error: false,
          msg: data.message,
        })
        setConfirmed(true)
      } catch (err) {
        setAlert({
          error: true,
          msg: err.response.data.message,
        })
      }
    }
    confirmAccount()
  }, [])
  const { msg } = alert
  return (
    <>
      <h1 className="text-purple-700 font-black text-5xl md:text-6xl capitalize">
        Confirma tu cuenta para recuperar el acceso{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg px-10 py-10 rounded-lg bg-white">
        {msg && <Alert alert={alert} setAlert={setAlert} />}
        {confirmed && (
          <Link
            to="/"
            className="inline-block text-purple-700 hover:text-purple-800 font-bold text-center">
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  )
}
