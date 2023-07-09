import FormProject from "../components/FormProject"

export default function NewProject() {
  return (
    <>
      <h1 className="text-4xl font-bold">Nuevo Proyecto</h1>
      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  )
}
