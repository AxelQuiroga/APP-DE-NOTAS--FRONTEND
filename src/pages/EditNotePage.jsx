import NoteForm from "../components/NoteForm"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"
import api from "../lib/api";

const EditNotePage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", description: "" });

  useEffect(() => {
    let isMounted = true;

    api.get(`/api/notes/${id}`)
      .then((res) => {
        if (isMounted) {
          setNote(res.data.note ?? { title: "", description: "" });
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (updateNote) => {
    try {
      await api.put(`/api/notes/${id}`, updateNote);

      toast.success("¡Note actualizada correctamente", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      console.error(error)
      if (error?.response?.status === 401) {
        return;
      }
      toast.error("No se pudo actualizar la nota");
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
