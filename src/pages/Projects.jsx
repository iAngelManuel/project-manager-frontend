import useProjects from "../hooks/useProjects"
import PreviewProject from "../components/PreviewProject"
import Alert from "../components/Alert"

export default function Projects() {
  const { projects, alert, setAlert } = useProjects()
  const { msg } = alert
  return (
    <>
      <h1 className="text-4xl font-bold">Proyectos</h1>
      {msg && <Alert alert={alert} setAlert={setAlert} />}
      <div className="bg-white mt-10 shadow rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 font-bold uppercase p-5">
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  )
}
