import useProjects from "../hooks/useProjects"

export default function Partner({ p }) {
  const { handleDeletePartnerModal } = useProjects()
  const { name, email } = p
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-sm font-bold text-gray-700">
          Nombre: {""}
          <span className="font-normal">{name}</span>
        </p>
        <p className="text-sm font-bold text-gray-700">
          Correo: {""}
          <span className="font-normal">{email}</span>
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleDeletePartnerModal(p)}
          className="bg-red-600 transition-colors hover:bg-red-700 flex gap-2 justify-center items-center text-white text-sm px-2 py-2 w-full md:w-auto rounded-lg font-bold">
          Eliminar Colaborador
        </button>
      </div>
    </div>
  )
}
