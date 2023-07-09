import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import FormPartner from "../components/FormPartner"

export default function NewPartner() {
  const { getProject, project, loading, partner, addPartner } = useProjects()
  const params = useParams()

  useEffect(() => {
    getProject(params.id)
  }, [])
  return (
    <>
      <h1 className="text-4xl font-bold">Añadir Colaborador(a) al Proyecto: {project.name}</h1>
      <div className="mt-10 flex justify-center items-center w-full">
        <FormPartner />
      </div>
      {loading ? <p className="text-center">Cargando...</p> : partner?._id && (
        <>
          <h3 className="text-2xl text-center font-bold mt-10">Resultado de búsqueda:</h3>
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 border border-gray-200 rounded-lg shadow-lg w-full">
              <h2 className="text-xl text-center font-bold mb-5">Colaborador(a)</h2>
              <div className="flex-row items-center gap-3">
                <p className="text-sm text-gray-600 text-center font-bold">Nombre: <span className="font-normal">{partner.name}</span></p>
                <p className="text-sm text-gray-600 text-center font-bold">Email: <span className="font-normal">{partner.email}</span></p>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => addPartner({ email: partner.email })}
                  className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-3 rounded-lg mt-5 cursor-pointer"
                >Agregar Colaborador</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
