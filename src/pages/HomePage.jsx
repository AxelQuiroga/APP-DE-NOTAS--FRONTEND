import { useEffect, useState } from "react";
import { CardNote } from "../components/CardNote";
import formatData from "../../utils/formatDate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const HomePage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/notes/${noteToDelete}`);

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== noteToDelete),
      );
      toast.success("¡Note eliminado correctamente", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      setNoteToDelete(null);
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401) {
        return;
      }
      toast.error("Error al eliminar la nota");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await api.get(`/api/notes`);
        if (isMounted) {
          setNotes(response.data);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          return;
        }
        toast.error("No se pudieron cargar las notas");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <span>Cargando...</span>;

  return (
    <div
      className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 
    xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]"
    >
      {notes.map((note) => (
        <CardNote
          key={note._id}
          title={note.title}
          description={note.description}
          id={note._id}
          date={formatData(note.createdAt)}
          onDelete={(id) => setNoteToDelete(id)}
          onEdit={(id) => navigate(`/editNote/${id}`)}
        />
      ))}

      {noteToDelete && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              ¿Estás seguro que quieres borrar esta nota?
            </h3>

            <div className="modal-action">
              <button className="btn" onClick={() => setNoteToDelete(null)}>
                Cancelar
              </button>

              <button className="btn btn-error" onClick={handleDelete}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
