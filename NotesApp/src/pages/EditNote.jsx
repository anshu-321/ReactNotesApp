import { React, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useCreateDate from "../components/useCreateDate";

function EditNote({ notes, setNotes }) {
  const { id } = useParams();
  const note = notes.find((item) => item.id === id);
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && details) {
      const newNote = { ...note, title, details, date };

      const newNotes = notes.map((item) => {
        if (item.id == id) {
          item = newNote;
        }
        return item;
      });
      setNotes(newNotes);
    }

    navigate("/");
  };

  const handleDelete = () => {
    const newNotes = notes.filter((item) => item.id !== id);
    setNotes(newNotes);
    navigate("/");
  };

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoArrowBackOutline />
        </Link>
        <button className="btn lg primary " onClick={handleSubmit}>
          Save
        </button>
        <button className="btn lg danger " onClick={handleDelete}>
          <MdDelete />
        </button>
      </header>
      <form className="create-note__form">
        <input
          type="text"
          placeholder="Title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="28"
          placeholder="Note Details.."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
}

export default EditNote;
