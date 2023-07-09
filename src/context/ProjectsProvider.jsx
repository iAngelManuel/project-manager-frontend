import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket;

export const ProjectsContext = createContext()

export default function ProjectsProvider({ children }) {
  const [ projects, setProjects ] = useState([])
  const [ project, setProject ] = useState({})
  const [ alert, setAlert ] = useState({})
  const [ loading, setLoading] = useState(false)
  const [ taskFormModal, setTaskFormModal ] = useState(false)
  const [ deleteTaskModal, setDeleteTaskModal ] = useState(false)
  const [ task, setTask ] = useState({})
  const [ partner, setPartner ] = useState({})
  const [ deletePartnerModal, setDeletePartnerModal ] = useState(false)
  const [ searching, setSearching ] = useState(false)

  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
        const { data } = await clientAxios('/projects', config)
        setProjects(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProjects()
  }, [auth])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BE_URL)
  }, [])

  const showAlert = (alert) => {
    setAlert(alert)
  }

  const getProjects = async project => {
    if(project.id) {
      await editProject(project)
    } else {
      await newProject(project)
    }
  }

  const editProject = async project => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.put(`/projects/${project.id}`, project, config)
      const newProject = projects.map(projectState => projectState._id === data._id ? data : projectState)
      setProjects(newProject)
      setAlert({
        error: false,
        msg: 'Proyecto editado correctamente'
      })
      setTimeout(() => {
        setAlert({})
        navigate('/projects')
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  const newProject = async project => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.post('/projects', project, config)
      setProjects([...projects, data])
      setAlert({
        error: false,
        msg: 'Proyecto creado correctamente'
      })
      setTimeout(() => {
        setAlert({})
        navigate('/projects')
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  const getProject = async id => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios(`/projects/${id}`, config)
      setProject(data)
    } catch (err) {
      navigate('/projects')
      setAlert({
        error: true,
        msg: err?.response?.data?.msg
      })
      setTimeout(() => setAlert({}), 3000)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async id => {
    const token = localStorage.getItem('token')
    if (!token) return 

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      } 
    }
    try {
      await clientAxios.delete(`/projects/${id}`, config)
      const newProjects = projects.filter(projectState => projectState._id !== id)
      setProjects(newProjects)
      setAlert({
        error: false,
        msg: 'Proyecto eliminado correctamente'
      })
      setTimeout(() => {
        setAlert({})
        navigate('/projects')
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  const handleTaskFormModal = () => {
    setTaskFormModal(!taskFormModal)
    setTask({})
  }

  const submitTask = async task => {
    if (task?.id) {
      await editTask(task)
    } else {
      await createTask(task)
    }
  }

  const createTask = async task => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.post('/tasks', task, config)
      socket.emit('new-task', data)
      setAlert({
        error: false,
        msg: 'Tarea creada correctamente'
      })
      setTimeout(() => {
        setAlert({})
        setTaskFormModal(false)
      }, 3000)
    } catch(err) {
      console.log(err)
    }
  }

  const editTask = async task => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config)
      socket.emit('update-task', data)
      setAlert({
        error: false,
        msg: 'Tarea editada correctamente'
      })
      setTaskFormModal(false)
      setTimeout(() => setTask({}), 3000)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditTask = async task => {
    setTask(task)
    setTaskFormModal(true)
  }

  const handleDeleteTask = task => {
    setTask(task)
    setDeleteTaskModal(!deleteTaskModal)
  }

  const deleteTask = async () => {
    setDeleteTaskModal(false)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config)
      socket.emit('delete-task', task)
      setAlert({
        error: false,
        msg: data.message
      })
      setTimeout(() => setAlert({}), 3000)
    } catch(err) {
      console.log(err)
    }
  }

  const submitPartner = async email => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.post('/projects/partners', { email }, config)
      setPartner(data)
      setAlert({})
    } catch (err) {
      setAlert({
        error: true,
        msg: err.response.data.message
      })
      setTimeout(() => setAlert({}), 3000)
    } finally {
      setLoading(false)
    }
  }

  const addPartner = async email => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.post(`/projects/partners/${project._id}`, email, config)
      setPartner({})
      setAlert({
        error: false,
        msg: data.message
      })
      setTimeout(() => setAlert({}), 3000)
    } catch (err) {
      setAlert({
        error: true,
        msg: err.response.data.message
      })
      setPartner({})
      setTimeout(() => setAlert({}), 3000)
    }
  }

  const handleDeletePartnerModal = p => {
    setDeletePartnerModal(!deletePartnerModal)
    setPartner(p)
  }

  const deletePartner = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.post(`/projects/delete-partner/${project._id}`, { id: partner._id }, config)
      const newProject = {...project}
      newProject.partners = newProject.partners.filter(partnerState => partnerState._id !== partner._id)
      setProject(newProject)
      setAlert({
        error: false,
        msg: data.message
      })
      setPartner({})
      setDeletePartnerModal(false)
      setTimeout(() => setAlert({}), 3000)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCompleteTask = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
      const { data } = await clientAxios.post(`/tasks/status/${id}`, {}, config)
      socket.emit('change-status', data)
      setTask({})
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearching = () => {
    setSearching(!searching)
  }

  const submitTaskProject = task => {
    const newProject = { ...project }
    newProject.tasks = [...newProject.tasks, task]
    setProject(newProject)
  }

  const deleteTaskProject = task => {
    const newProject = { ...project }
    newProject.tasks = newProject.tasks.filter(taskState => taskState._id !== task._id)
    setProject(newProject)
  }

  const editTaskProject = task => {
    const newProject = { ...project }
    newProject.tasks = newProject.tasks.map(taskState => taskState._id === task._id ? task : taskState)
    setProject(newProject)
  }

  const changeChangeStatus = task => {
    const newProject = { ...project }
    newProject.tasks = newProject.tasks.map(taskState => taskState._id === task._id ? task : taskState)
    setProject(newProject)
  }

  const finishSession = () => {
    setProjects([])
    setProject({})
    setTask({})
    setPartner({})
    setAlert({})
    setTaskFormModal(false)
    setDeleteTaskModal(false)
    setDeletePartnerModal(false)
    setSearching(false)
  }

  return (
    <ProjectsContext.Provider value={{
      projects,
      alert,
      setAlert,
      showAlert,
      getProjects,
      getProject,
      project,
      loading,
      deleteProject,
      taskFormModal,
      handleTaskFormModal,
      submitTask,
      task,
      handleEditTask,
      deleteTaskModal,
      handleDeleteTask,
      deleteTask,
      submitPartner,
      partner,
      addPartner,
      deletePartnerModal,
      handleDeletePartnerModal,
      deletePartner,
      handleCompleteTask,
      searching,
      handleSearching,
      submitTaskProject,
      deleteTaskProject,
      editTaskProject,
      changeChangeStatus,
      finishSession
    }}>{children}</ProjectsContext.Provider>
  )
}
