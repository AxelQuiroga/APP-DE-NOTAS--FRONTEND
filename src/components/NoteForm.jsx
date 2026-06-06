import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NoteForm = ({ onSubmit, initialDate }) => {
  const [note, setNotes] = useState(initialDate);

  useEffect(() => {
    setNotes(initialDate);
  }, [initialDate]);

  const handleChange = (e) => {
    setNotes({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    if (note.title.length < 3) {
      toast.error("El título es muy corto");
      return;
    }

    if (!note.description.trim() || note.description.length < 6) {
      toast.error("La descripción es demasiado corta");
      return;
    }

    onSubmit(note);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-300 rounded-lg max-w-4xl mx-auto p-10"
    >
      <input
        className="block w-full mb-8 input lg:input-lg focus:ring-0 focus:outline-0 border-0"
        placeholder="Title"
        type="text"
        id="title"
        name="title"
        value={note.title}
        onChange={handleChange}
        required
      />
      <textarea
        className="input lg:input-lg resize-y w-full mb-8 textarea focus:outline-0 border-0"
        name="description"
        id="description"
        placeholder="Description of the work"
        value={note.description}
        onChange={handleChange}
        minLength={6}
        maxLength={110}
        required
      ></textarea>

      <button className="btn btn-soft btn-primary">Submit</button>
    </form>
  );
};

export default NoteForm;
