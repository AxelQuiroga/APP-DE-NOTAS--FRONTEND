import { useEffect, useState } from "react";
import { CardNote } from "../components/CardNote";
import axios from "axios";
import formatData from "../../utils/formatDate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null); //confirmacion si quiere borrar

  const handleDelete = async () => {
    //fuuncion para borrar
    try {
      const res = await axios.delete(`${apiURL}/api/notes/${noteToDelete}`);
      console.log(res.status);

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== noteToDelete),
      );
      toast.success("¡Note eliminated sucessfully", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      setNoteToDelete(null); //cerrar modal
    } catch (error) {
      console.error(error);
      toast.error("Error deleting note");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/notes`);
        setNotes(response.data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
          email={note.email}
          phone={note.phone}
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
