import NoteForm from "../components/NoteForm"
import axios from "axios"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
const CreateNotePage = () => {
  const navigate = useNavigate() 
  const handleCreate = async (note) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`,note)
    
      if(res.status !== 201){
        throw new Error("Error al crear una nota")
      } 
      toast.success("¡Note created sucessfully",{
        position: "bottom-center",
        autoClose:3000,
        theme:"colored",
      });
      navigate("/")
   
  } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
        
        <NoteForm onSubmit={handleCreate} initialDate={{title: "",description:"",email: "",phone:""}}/>
    </div>
  )
}

export default CreateNotePage