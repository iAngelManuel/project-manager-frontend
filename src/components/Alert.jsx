export default function Alert({ alert, setAlert }) {
  const { error, msg } = alert
  setTimeout(() => setAlert({}), 4000)
  return (
    <div
      className={`${error ? "from-red-400 to-red-600" : "from-green-400 to-green-600"} bg-gradient-to-br text-center p-3 rounded-lg uppercase text-white shadow-lg font-bold text-sm my-3`}>
      {msg}
    </div>
  )
}
