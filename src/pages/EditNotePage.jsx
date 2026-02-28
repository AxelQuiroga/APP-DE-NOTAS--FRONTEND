import NoteForm from "../components/NoteForm"
import axios from "axios"
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"

const EditNotePage = () => {
  const navigate = useNavigate()
  const { id } = useParams(); // <-- acá capturamos el id de la URL
  const [note, setNote] = useState({ title: "", description: "",email:"",phone:"" });

  useEffect(() => {
    // Traemos la nota del backend
      axios.get(`${import.meta.env.VITE_API_URL}/api/notes/${id}`)
      .then(res => setNote(res.data.note))
      .catch(err => console.log(err));
  }, [id]);
  
 /* const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
  };*/

  const handleSubmit = (updateNote) => {
    try {
      axios.put(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, updateNote)
      
            
            toast.success("¡Note updated sucessfully",{
              position: "bottom-center",
              autoClose:3000,
              theme:"colored",
            });
            navigate("/")
          
    } catch (error) {
       console.error(error)
    }
      
      
  };


 return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-10 mb-6">
  Editar Nota
</h2>
     
    
     <NoteForm 
        onSubmit={handleSubmit} 
        initialDate={note} 
      />
    </div>
  );
};

export default EditNotePage;
