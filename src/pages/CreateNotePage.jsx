import NoteForm from "../components/NoteForm"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import api from "../lib/api"

const CreateNotePage = () => {
  const navigate = useNavigate()

  const handleCreate = async (note) => {
    try {
      const res = await api.post(`/api/notes`, note)

      if (res.status !== 201) {
        throw new Error("Error al crear una nota")
      }

      toast.success("¡Note creada correctamente", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/")
    } catch (error) {
      console.error(error)
      if (error?.response?.status === 401) {
        return;
      }
      toast.error("No se pudo crear la nota")
    }
  }

  return (
    <div>
      <NoteForm onSubmit={handleCreate} initialDate={{ title: "", description: "" }} />
    </div>
  )
}

export default CreateNotePage
